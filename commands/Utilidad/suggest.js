const { MessageEmbed } = require('discord.js')

module.exports = {
    run: async(client, message, args, owner) => {


        message.delete({ timeout: 100 })
        let today = new Date();
        let date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        let msgDocument2 = await guild2.findOne({ guildId: message.guild.id })
        if (!msgDocument2.sugerencias) return message.channel.send("Tienes desactivado el sistema de sugerencias")
        if (msgDocument2 && msgDocument2.sugerencias) {
            let texto = args.slice(0).join(" ");
            if (!texto)
                return message.channel.send("**Debes poner el texto que deseas enviar.**");
            if (texto.length > 1024) return message.channel.send(`**¡Llegaste al limite de caracteres!**`).then(m => {
                m.delete({ timeout: 5000 })
            });
            message.channel.send('**¡Sugerencia enviada!**').then(m => {
                m.delete({ timeout: 5000 })

            });

            let channel = message.guild.channels.cache.get(e.channelID)

            const msgChannel = new MessageEmbed()
                .setTitle(`Sugerencia de ${message.author.username}`)
                .addField('**Fecha de creación**', date, true)
                .addField('**Sugerencia:**', texto)
                .setTimestamp()
                .setColor('#ffe000')
            channel.send(msgChannel).then(async m => {
                m.react('✅'); // enviar el emoji por codigo
                setTimeout(() => {
                    m.react('🚫')
                }, 1000)

            });
        }


    },
    config: {
        name: 'suggest',
        description: 'Enviar sugerencia del servidor',
        usage: 'suggest <razon>',
        category: 'Utilidad',
        accessableby: 'Miembros',
        cooldown: 5,
        aliases: ['sg', 'su', 'SUGGEST'],
        Example: ["```" + 'suggest Meter mas comandos c:' + "```"]
    }
}