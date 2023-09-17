module.exports = {
    name: 'sendmessage',
    description: 'Envoie un message à un canal spécifié.',
    execute(message, args) {
        // Vérifiez si l'utilisateur qui a envoyé la commande a la permission de gérer les messages
        if (!message.member.permissions.has('MANAGE_MESSAGES')) {
            return message.reply('Vous n\'avez pas la permission d\'envoyer des messages.');
        }

        // Vérifiez si le nombre d'arguments est valide
        if (args.length < 1) {
            return message.reply('Utilisation correcte : !sendmessage <votre-message>');
        }

        // Obtenez le message à partir des arguments
        const content = args.join(' ');

        // Envoyez le message dans le canal actuel
        message.channel.send(content)
            .then(() => {
                message.reply('Message envoyé avec succès.');
            })
            .catch(error => {
                console.error(error);
                message.reply('Une erreur s\'est produite lors de l\'envoi du message.');
            });
    },
};
