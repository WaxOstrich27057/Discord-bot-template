module.exports = {
    name: 'mute',
    description: 'Met en sourdine un utilisateur.',
    execute(message, args) {
        // Vérifiez si l'utilisateur qui a envoyé la commande a la permission de gérer les rôles
        if (!message.member.permissions.has('MANAGE_ROLES')) {
            return message.reply('Vous n\'avez pas la permission de gérer les rôles.');
        }

        // Vérifiez s'il y a une mention d'utilisateur dans la commande
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('Veuillez mentionner l\'utilisateur que vous souhaitez mettre en sourdine.');
        }

        // Obtenez la mention de l'utilisateur et le reste du texte comme raison
        const reason = args.slice(1).join(' ') || 'Aucune raison spécifiée';

        // Vérifiez si le serveur a un rôle de sourdine (mute role) configuré
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) {
            return message.reply('Le rôle de sourdine (Muted) n\'existe pas sur ce serveur. Assurez-vous de le créer.');
        }

        // Obtenez le membre (guild member) associé à l'utilisateur
        const member = message.guild.members.cache.get(user.id);

        // Vérifiez si l'utilisateur cible a déjà le rôle de sourdine
        if (member.roles.cache.has(muteRole.id)) {
            return message.reply('Cet utilisateur est déjà en sourdine.');
        }

        // Mettez en sourdine l'utilisateur en ajoutant le rôle de sourdine
        member.roles.add(muteRole)
            .then(() => {
                message.channel.send(`L'utilisateur ${user.tag} a été mis en sourdine. Raison : ${reason}`);
            })
            .catch(error => {
                console.error(error);
                message.reply('Une erreur s\'est produite lors de la mise en sourdine de l\'utilisateur.');
            });
    },
};
