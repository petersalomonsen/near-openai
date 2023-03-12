const token = process.env.OPENAI_TOKEN;

export const config = {
    runtime: 'edge',
};

export default async (request) => {
    const input = JSON.parse(new TextDecoder().decode((await request.body.getReader().read()).value));

    const transactionResult = await fetch('https://rpc.mainnet.near.org', {
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
    });
    const openairesponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: input.messages
        })
    }).then(r => r.json());

    if (transactionResult.result.status.SuccessValue!=undefined &&
        transactionResult.result.transaction.received_id == 'jsinrust.near' &&
        transactionResult.result.deposit > 10000_0000000000_0000000000n
    ) {
        return new Response(JSON.stringify(openairesponse), {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST",
                "Content-Type": "application/json"
            }
        });
    }
};
