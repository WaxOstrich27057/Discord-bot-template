module.exports = {
    name: 'kick',
    description: 'Kick un membre du serveur',
    execute(message, args) {
        // Vérifiez si l'utilisateur qui a envoyé la commande a la permission de kick des membres
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            return message.reply(`Vous n'avez pas la permission de kick des membres.`);
        }

        // Vérifiez s'il y a une mention d'utilisateur dans la commande
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('Veuillez mentionner l\'utilisateur que vous souhaitez kick.');
        }

        // Obtenez le membre correspondant à l'utilisateur mentionné
        const member = message.guild.members.cache.get(user.id);

        // Vérifiez si le membre peut être kické (vérifiez les rôles et les autorisations)
        if (!member.kickable) {
            return message.reply('Je ne peux pas kick cet utilisateur.');
        }

        // Essayez de kick le membre
        member
            .kick()
            .then(() => {
                message.channel.send(`L'utilisateur ${user.tag} a été kické avec succès.`);
            })
            .catch((error) => {
                console.error(error);
                message.reply('Une erreur s\'est produite lors du kick de l\'utilisateur.');
            });
    },
};
