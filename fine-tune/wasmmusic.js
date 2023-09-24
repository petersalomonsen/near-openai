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

example = new Example();
example.addMessage('system', "I write javascript code for WebAssembly Music");
example.addMessage('user', "I have the instruments: piano, strings, drums, and I want chords in d minor and c major on every 1/8th for the piano and on every 2/4th for the strings, and a drum beat with alternating kick and snare and with hihats.");
example.addMessage('assistant', "Here's the WebAssembly Music javascript code:\n```\n" + await readFile(new URL('simpletrack.js', import.meta.url)) + "\n```\n");
example.addMessage('user', "Can you also add a simple bass?");
example.addMessage('assistant', "Here's the WebAssembly Music javascript code including a bass:\n```\n" + await readFile(new URL('simpletrack_w_bass.js', import.meta.url)) + "\n```\n");

examples.push(example);

example = new Example();
example.addMessage('system', "I write javascript code for WebAssembly Music");
example.addMessage('user', "I have the instruments: piano, strings, drums, guitar and bass, and I want chords in d minor and c major on every 1/8th for the piano and on every 2/4th for the strings, and a drum beat with alternating kick and snare and with hihats, and a simple bass.");
example.addMessage('assistant', "Here's the WebAssembly Music javascript code:\n```\n" + await readFile(new URL('simpletrack_w_bass.js', import.meta.url)) + "\n```\n");

examples.push(example);

example = new Example();
example.addMessage('system', "I write javascript code for WebAssembly Music");
example.addMessage('user', "Can you write the code for jingle bells on the piano?");
example.addMessage('assistant', "Here's the WebAssembly Music javascript code:\n```\n" + await readFile(new URL('jinglebells.js', import.meta.url)) + "\n```\n");

examples.push(example);

example = new Example();
example.addMessage('system', "I write javascript code for WebAssembly Music");
example.addMessage('user', "Can you write the code for jingle bells on the piano?");
example.addMessage('assistant', "Here's the WebAssembly Music javascript code:\n```\n" + await readFile(new URL('jinglebells.js', import.meta.url)) + "\n```\n");
example.addMessage('user', "Can you also add bass?");
example.addMessage('assistant', "Here's the WebAssembly Music javascript code:\n```\n" + await readFile(new URL('jinglebells_w_bass.js', import.meta.url)) + "\n```\n");

examples.push(example);

example = new Example();
example.addMessage('system', "I write javascript code for WebAssembly Music");
example.addMessage('user', "I would like a baseline like d2(0.5),,,d3(0.1),,a2(0.1),c3(0.1),d3(0.1), and then in c and then in g and finally in f");
example.addMessage('assistant', "Here's the WebAssembly Music javascript code:\n```\n" + await readFile(new URL('baseline.js', import.meta.url)) + "\n```\n");

examples.push(example);

example = new Example();
example.addMessage('system', "I write javascript code for WebAssembly Music");
example.addMessage('user', "Give me a drumbeat in 120 bpm");
example.addMessage('assistant', "Here's the WebAssembly Music javascript code:\n```\n" + await readFile(new URL('drumbeat.js', import.meta.url)) + "\n```\n");

examples.push(example);

example = new Example();
example.addMessage('system', "I write javascript code for WebAssembly Music");
example.addMessage('user', "Give me a drumbeat, with a base in d at 120 bpm");
example.addMessage('assistant', "Here's the WebAssembly Music javascript code:\n```\n" + await readFile(new URL('drumsandbase.js', import.meta.url)) + "\n```\n");

examples.push(example);

example = new Example();
example.addMessage('system', "I write javascript code for WebAssembly Music");
example.addMessage('user', "Give me a drumbeat, with a base in d, and guitar at 120 bpm");
example.addMessage('assistant', "Here's the WebAssembly Music javascript code:\n```\n" + await readFile(new URL('drumsandbaseandguitar.js', import.meta.url)) + "\n```\n");

examples.push(example);

example = new Example();
example.addMessage('system', "I write javascript code for WebAssembly Music");
example.addMessage('user', "Give me a drumbeat, with a base in e minor, and guitar at 120 bpm");
example.addMessage('assistant', "Here's the WebAssembly Music javascript code:\n```\n" + await readFile(new URL('drumsandbaseandguitar.js', import.meta.url)) + "\n```\n");

examples.push(example);

example = new Example();
example.addMessage('system', "I write javascript code for WebAssembly Music");
example.addMessage('user', "Give me a drumbeat, with a base in e minor, and guitar at 120 bpm");
example.addMessage('assistant', "Here's the WebAssembly Music javascript code:\n```\n" + await readFile(new URL('drumsandbaseandguitar_e.js', import.meta.url)) + "\n```\n");

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

const deleteFiles = async () => {
    const files = await openai.files.list();

    for (const file of files.data) {
        await openai.files.del(file.id);
    }
}

const jobs = await openai.fineTuning.jobs.list();
console.log(jobs.data[0].error);
