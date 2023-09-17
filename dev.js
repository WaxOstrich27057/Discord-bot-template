module.exports = {
    name: 'dev',
    description: 'A developer-only command',
    execute(message, args) {
        if (message.author.id === 'YOUR_DEVELOPER_ID') {
            message.channel.send('This is a developer command.');
        } else {
            message.channel.send('You are not authorized to use this command.');
        }
    },
};
