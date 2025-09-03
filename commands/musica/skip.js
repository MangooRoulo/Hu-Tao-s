const { id } = require('common-tags');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const DisTube = require('distube')
const client = new Discord.Client()

module.exports = {
    
    run: async(client, message, args) => {

        const serverQueue = client.distube.getQueue(message)

        if (!message.member.voice.channel) {

            const embed = new MessageEmbed()
            .addField("Error ❌ ", "Debes estar conectado en un canal de voz", true)
            embed.setColor("#FF0000")
        
            return message.channel.send(embed);
        }

        // Aquí verificamos si el objeto de la lista de canciones esta vacía.
        if (!serverQueue) {

            const embed = new MessageEmbed()
            .addField("Error ❌ ", "No hay canciones que saltar", true)
            embed.setColor("#FF0000")
        
            return message.channel.send(embed);
        }

        client.distube.skip(message) 

        const embed = new MessageEmbed()
        .setAuthor('Hu Tao´s Bot', client.user.avatarURL() )
        .addField("Aceptado ☑️", "La canción se ha saltado correctamente", true)
        .setTimestamp() 
        .setFooter(`Saltado por, ${message.author.tag}`)
        embed.setColor("#00FF32")

        return message.channel.send(embed);
        
    },
             
    config: {
        name: 'skip',
        description: '',
        usage: '',
        category: 'musica',
        accessableby: '',
        cooldown:5,
        aliases: ['skip'],
        Example: []
    }
}