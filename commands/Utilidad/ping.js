const { EmbedBuilder } = require('discord.js');

module.exports = {
    run: async(client, message, args) => {
        const embed = new EmbedBuilder()
            .setTitle('Pong!')
            .setDescription(`La latencia del bot es de ${Math.round(client.ws.ping)}ms.`)
            .setColor('Random');
        message.channel.send({ embeds: [embed] });
    },
    config: {
        name: 'ping',
        description: 'Verifica la latencia del bot.',
        usage: 'ping',
        category: 'Utilidad',
        accessableby: 'Miembros',
        cooldown: 5,
        aliases: ['latencia'],
        Example: ["```!ping```"]
    }
};
