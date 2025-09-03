const { id } = require('common-tags');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const DisTube = require('distube')
const client = new Discord.Client()

module.exports = {
    
    run: async(client, message, args) => {

        if(!message.member.voice.channel) {

            const embed = new MessageEmbed()
            .addField("Error ❌ ", "Debes de estar en un canal de voz para usar este comando", true)
            embed.setColor("#FF0000")
        
            return message.channel.send(embed);

        }

        if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id){

            const embed = new MessageEmbed()
            .addField("Error ❌ ", "Debes de estar en el mismo canal que yo", true)
            embed.setColor("#FF0000")
        
            return message.channel.send(embed);
        }

        const serverQueue = client.distube.getQueue(message)

        if(!serverQueue) {

            const embed = new MessageEmbed()
            .setAuthor('Hu Tao´s Bot', client.user.avatarURL() )
            .addField("Error ❌ ", "No hay canciones reproduciendose ahora", true)
            .setTimestamp() 
            embed.setColor("#FF0000")
        
            return message.channel.send(embed);
        }

        if(!serverQueue.pause) {

            const embed = new MessageEmbed()
            .setAuthor('Hu Tao´s Bot', client.user.avatarURL() )
            .addField("Error ❌ ", "La música no estaba pausada", true)
            .setTimestamp() 
            embed.setColor("#FF0000")
        
            return message.channel.send(embed);
        }

        client.distube.resume(message) 

            const embed = new MessageEmbed()
            .setAuthor('Hu Tao´s Bot', client.user.avatarURL() )
            .addField("Aceptado ☑️", "La música fue resumida") 
            .setTimestamp() 
            .setFooter(`Reanudado por, ${message.author.tag}`)
            embed.setColor("#00FF32")
    
            return message.channel.send(embed);

    },
             
    config: {
        name: 'continue',
        description: '',
        usage: '',
        category: 'musica',
        accessableby: '',
        cooldown:5,
        aliases: ['continue', 'c'],
        Example: []
    }
}