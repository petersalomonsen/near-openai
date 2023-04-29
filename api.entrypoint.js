import openai from "./api/openai.js"

addEventListener('fetch', async event => {
    return event.respondWith(await openai(event.request))
});