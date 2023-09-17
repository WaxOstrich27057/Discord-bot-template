const { Client, Intents } = require('discord.js');
const bot = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

bot.config = require('./config.json');

const fs = require('fs');
const path = require('path');

bot.commands = new Map();

const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(__dirname, 'commands', file));
    bot.commands.set(command.name, command);
}

bot.once('ready', () => {
    console.log(`Bot chargé avec succès !`);
});

bot.on('messageCreate', message => {
    if (!message.content.startsWith(bot.config.prefix) || message.author.bot) return;

    const args = message.content.slice(bot.config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!bot.commands.has(commandName)) return;

    const command = bot.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('An error occurred while executing the command.');
    }
});

bot.login(bot.config.token);
