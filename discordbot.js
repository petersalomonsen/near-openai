import Discord, { GatewayIntentBits } from 'discord.js';

const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
const prefix = '!'; // Change this to your desired prefix

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', msg => {
    console.log(msg.content);
    if (msg.author.bot) return;
    if (msg.content.startsWith(prefix)) {
        const args = msg.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (command === 'hello') {
            msg.reply('Hello, World!');
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
