module.exports = {
    name: 'warn',
    description: 'Donne un avertissement à un membre.',
    execute(message, args) {
        // Vérifiez si l'utilisateur qui a envoyé la commande a la permission d'administrateur
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply('Vous n\'avez pas la permission de donner des avertissements.');
        }

        // Vérifiez s'il y a une mention d'utilisateur dans la commande
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('Veuillez mentionner l\'utilisateur que vous souhaitez avertir.');
        }

        // Obtenez la mention de l'utilisateur et le reste du texte comme raison
        const reason = args.slice(1).join(' ');

        // Vérifiez s'il y a une raison spécifiée
        if (!reason) {
            return message.reply('Veuillez spécifier une raison pour l\'avertissement.');
        }

        // Vous pouvez personnaliser la façon dont vous stockez ou gérez les avertissements ici
        // Par exemple, vous pourriez les enregistrer dans une base de données

        // Répondez pour confirmer l'avertissement
        message.channel.send(`Avertissement donné à ${user.tag} pour la raison : ${reason}`);
    },
};
