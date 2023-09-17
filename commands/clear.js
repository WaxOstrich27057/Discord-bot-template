module.exports = {
    name: 'clear',
    description: 'Supprime un certain nombre de messages dans le salon.',
    execute(message, args) {
        // Vérifiez si l'utilisateur qui a envoyé la commande a la permission de gérer les messages
        if (!message.member.permissions.has('MANAGE_MESSAGES')) {
            return message.reply('Vous n\'avez pas la permission de supprimer des messages.');
        }

        // Vérifiez si le nombre d'arguments est valide
        const amount = parseInt(args[0]);

        if (isNaN(amount) || amount <= 0 || amount > 100) {
            return message.reply('Veuillez spécifier un nombre entre 1 et 100 pour supprimer les messages.');
        }

        // Supprimez les messages
        message.channel.bulkDelete(amount, true)
            .then(deletedMessages => {
                message.reply(`Suppression de ${deletedMessages.size} messages.`)
                    .then(replyMessage => {
                        setTimeout(() => {
                            replyMessage.delete();
                        }, 3000); // Supprimez la réponse après 3 secondes
                    });
            })
            .catch(error => {
                console.error(error);
                message.reply('Une erreur s\'est produite lors de la suppression des messages.');
            });
    },
};
