const token = process.env.OPENAI_TOKEN;

export const config = {
    runtime: 'edge',
};

export default async (request) => {
    const input = await request.json();

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
                const chunkAsText = new TextDecoder().decode(chunk);
                let newlinepos = chunkAsText.indexOf('\n\n');
                while(newlinepos >= 0) {
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
};
