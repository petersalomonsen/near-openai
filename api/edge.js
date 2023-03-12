const token = process.env.OPENAI_TOKEN;

export const config = {
    runtime: 'edge',
};

export default async (request) => {
    const input = JSON.parse(new TextDecoder().decode((await request.body.getReader().read()).value));
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

    return new Response(JSON.stringify(openairesponse), {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST",
            "Content-Type": "application/json"
        }
    });
};
