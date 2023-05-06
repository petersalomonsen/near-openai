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

            for await (const chunk of openairesponse.body) {
                controller.enqueue(chunk);
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
