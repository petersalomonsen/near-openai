const token = process.env.OPENAI_TOKEN;

export const config = {
    runtime: 'edge',
};

export default async (request) => {
    const input = await request.json();

    const transactionAlreadyExecutedResult = await fetch('https://rpc.mainnet.near.org', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(
            {
                "jsonrpc": "2.0",
                "id": "dontcare",
                "method": "tx",
                "params": [input.transaction_hash, input.sender_account_id]
            }
        )
    }).then(r => r.json());

    if (transactionAlreadyExecutedResult.error && transactionAlreadyExecutedResult.error.cause.name == 'UNKNOWN_TRANSACTION') {
        const transactionResult = await fetch('https://rpc.mainnet.near.org', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "jsonrpc": "2.0",
                    "id": "dontcare",
                    "method": "broadcast_tx_commit",
                    "params": [input.signed_transaction]
                }
            )
        }).then(r => r.json());

        if (transactionResult.error) {
            return new Response(JSON.stringify({
                error: transactionResult.error
            }), {
                status: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST",
                    "Content-Type": "application/json"
                }
            });
        }

        const messagesStringified = JSON.stringify(input.messages);
        const expected_deposit = (50_00000_00000_00000_00000n).toString(); // 0.005 NEAR

        const expected_message_hash = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(messagesStringified))))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");

        const args_decoded = JSON.parse(atob(transactionResult.result.transaction.actions[0].FunctionCall.args));

        if (transactionResult.result.status.SuccessValue != undefined
            && transactionResult.result.transaction.receiver_id == 'jsinrust.near'
            && transactionResult.result.transaction.actions[0].FunctionCall.method_name == 'ask_ai'
            && transactionResult.result.transaction.actions[0].FunctionCall.deposit == expected_deposit
            && args_decoded.message_hash == expected_message_hash
        ) {

            return new Response(new ReadableStream({
                async start(controller) {
                    const openairesponse = await fetch('https://api.openai.com/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            model: 'gpt-3.5-turbo',
                            stream: true,
                            messages: input.messages
                        })
                    });

                    let currentPart = '';
                    for await (const chunk of openairesponse.body) {
                        let chunkAsText = new TextDecoder().decode(chunk);
                        let newlinepos = chunkAsText.indexOf('\n\n');
                        while (newlinepos >= 0) {
                            currentPart += chunkAsText.substring(0, newlinepos);

                            if (currentPart.startsWith('data: {')) {
                                const currentPartObj = JSON.parse(currentPart.substring('data: '.length));
                                if (currentPartObj.choices[0].delta && currentPartObj.choices[0].delta.content) {
                                    controller.enqueue(new TextEncoder().encode(currentPartObj.choices[0].delta.content));
                                }
                            }
                            chunkAsText = chunkAsText.substring(newlinepos + 2);
                            newlinepos = chunkAsText.indexOf('\n\n');
                            currentPart = '';
                        }
                        currentPart += chunkAsText;
                    }

                    controller.close();
                }
            }), {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST"
                }
            });
        } else {
            return new Response(JSON.stringify({
                expected_message_hash, expected_deposit
            }), {
                status: 403,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST",
                    "Content-Type": "application/json"
                }
            });
        }
    } else {
        return new Response(JSON.stringify({
            transaction_already_executed: input.transaction_hash
        }), {
            status: 403,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST",
                "Content-Type": "application/json"
            }
        });
    }
};
