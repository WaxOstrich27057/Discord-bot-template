module.exports = {
    name: 'help',
    description: 'Affiche la liste des commandes disponibles.',
    execute(message, args, bot) {
        // Créez un tableau pour stocker la liste des commandes et de leurs descriptions
        const commands = [];

        // Parcourez la Map des commandes et ajoutez-les au tableau
        bot.commands.forEach((command, name) => {
            commands.push(`**${name}**: ${command.description}`);
        });

        // Envoyez la liste des commandes dans le salon
        message.channel.send(`Voici la liste des commandes disponibles :\n\n${commands.join('\n')}`);
    },
};