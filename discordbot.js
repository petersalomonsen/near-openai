import Discord, { GatewayIntentBits } from 'discord.js';
import { ask_ai } from './client/nearopenaiclient.js';

const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async msg => {
    if (msg.author.bot) return;
    if (msg.mentions.users.find(user => user.username == 'nearopenai')) {
        console.log('asking AI about message', msg.content);
        msg.reply(await ask_ai([{ role: 'user', content: msg.content }]));
    }
});

client.login(process.env.DISCORD_TOKEN);
