const token = process.env.OPENAI_TOKEN;

export const config = {
    runtime: 'edge',
};

export default async (request) => {
    const input = await request.json();

    return new Response(new ReadableStream({
        async start(controller) {
            for(let n=0;n<60;n++) {
                controller.enqueue('counting '+n+'\n');
                await new Promise(r => setTimeout(() => r(), 1000));
            }
            controller.close();
        }
    }));
};
