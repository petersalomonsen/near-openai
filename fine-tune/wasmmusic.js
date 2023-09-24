import { writeFile, readFile } from 'fs/promises';
import { createReadStream } from 'fs';

import OpenAI, { toFile } from 'openai';


const examples = [];

class Example {
    messages = [];

    addMessage(role, content) {
        this.messages.push({ role, content });
    }
}

let example = new Example();
example.addMessage('system', "I write javascript code for WebAssembly Music");
example.addMessage('user', "I have the instruments: piano, strings, drums, and I want chords in d minor and c major on every 1/8th for the piano and on every 2/4th for the strings, and a drum beat with alternating kick and snare and with hihats.");
example.addMessage('assistant', "Here's your javascript code:\n```\n" + await readFile(new URL('simpletrack.js', import.meta.url)) + "\n```\n");

examples.push(example);

const filecontent = examples.map(example => JSON.stringify(example)).join('\n');
const filename = 'wasmmusic.jsonl';
const filepath = new URL('wasmmusic.jsonl', import.meta.url);
await writeFile(filepath, filecontent);

const openai = new OpenAI();

const uploadAndTune = async () => {
    const uploadedFile = await openai.files.create({ file: createReadStream(filepath), purpose: 'fine-tune' });

    console.log(uploadedFile);
    const fineTune = await openai.fineTuning.jobs.create({ training_file: uploadedFile.id, model: 'gpt-3.5-turbo' })
    console.log(fineTune);
}


