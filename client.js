import { ask_ai } from "./client/nearopenaiclient.js";

console.log(await ask_ai([{ role: 'user', content: process.argv[process.argv.length-1]}]));