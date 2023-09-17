module.exports = {
    name: 'ban',
    description: 'Banni un utilisateur du serveur.',
    execute(message, args) {
        // Vérifiez si l'utilisateur qui a envoyé la commande a la permission de bannir des membres
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.reply('Vous n\'avez pas la permission de bannir des membres.');
        }

        // Vérifiez s'il y a une mention d'utilisateur dans la commande
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('Veuillez mentionner l\'utilisateur que vous souhaitez bannir.');
        }

        // Vérifiez si l'utilisateur cible est bannissable
        const member = message.guild.members.cache.get(user.id);
        if (!member.bannable) {
            return message.reply('Impossible de bannir cet utilisateur.');
        }

        // Obtenez la mention de l'utilisateur et le reste du texte comme raison
        const reason = args.slice(1).join(' ') || 'Aucune raison spécifiée';

        // Bannir l'utilisateur avec la raison spécifiée
        member.ban({ reason: reason })
            .then(() => {
                message.channel.send(`L'utilisateur ${user.tag} a été banni. Raison : ${reason}`);
            })
            .catch(error => {
                console.error(error);
                message.reply('Une erreur s\'est produite lors du bannissement de l\'utilisateur.');
            });
    },
};
