import { EdgeRuntime } from 'edge-runtime'
import { readFile } from 'fs/promises';
import { config } from 'dotenv';

config();

const messages = [
    { "role": "system", "content": `You are a helpful assistant ready to answer the big questions in life` },
    { "role": "user", "content": `What is the meaning of life according to hitchhikers guide to the galaxy?` }
];

const openaicode = (await readFile(new URL('./api.bundle.js', import.meta.url))).toString();
const runtime = new EdgeRuntime({
    initialCode: openaicode,
    extend: (context) =>
        Object.assign(context, {
            process: { env: { OPENAI_TOKEN: process.env.OPENAI_TOKEN } },
        }),
});

const response = await runtime.dispatchFetch('https://example.com', {
    method: 'POST',
    body: JSON.stringify({
        transaction_hash: '5sQNWgaoVptT4U73qsLr5YaimKmDf8mLUGDHsm9nBurf',
        sender_account_id: 'jsinrustnft.near',
        messages: messages
    })
});

await response.waitUntil();
console.log('response', await response.text());