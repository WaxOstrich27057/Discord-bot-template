const path = require('path');
const fs = require('fs');
const { Client, Intents } = require('discord.js');

process.on('uncaughtException', (error) => {
    console.error(`Une erreur non gérée s'est produite :`, error);
}); 

const bot = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

bot.config = require('./config.json'); // Charger la configuration

// ... (autres configurations et chargement de commandes)

bot.once('ready', () => {
    console.log(`Bot chargé avec succès !`);
});

bot.commands = new Map();
bot.commands.set('warn', require('./commands/warn.js'));
bot.commands.set('clear', require('./commands/clear.js'));
bot.commands.set('say', require('./commands/say.js'));
bot.commands.set('ban', require('./commands/ban.js'));
bot.commands.set('mute', require('./commands/mute.js'));
bot.commands.set('kick', require('./commands/kick.js'));

bot.on('messageCreate', message => {
    const args = message.content.slice(bot.config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!bot.commands.has(commandName)) return;

    const command = bot.commands.get(commandName);

    try {
        command.execute(message, args, bot); // Passer 'bot' en tant qu'argument supplémentaire
    } catch (error) {
        console.error(error);
        message.reply('An error occurred while executing the command.');
    }
});

bot.login(bot.config.token);