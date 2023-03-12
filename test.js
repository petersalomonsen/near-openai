import { EdgeRuntime } from 'edge-runtime'
import { readFile } from 'fs/promises';
import { config } from 'dotenv';

config();

const initialCode = (await readFile('openai.js')).toString();

const runtime = new EdgeRuntime({ initialCode })

const response = await runtime.dispatchFetch(
    'http://blabla.com', {
        method: 'POST',
        body: JSON.stringify({messages: [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Who won the world series in 2020?"},
            {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
            {"role": "user", "content": "Where was it played?"}
        ]})
    }
)

// If your code logic performs asynchronous tasks, you should await them.
// https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil
await response.waitUntil()

// `response` is Web standard, you can use any of it's methods
console.log(await response.text());