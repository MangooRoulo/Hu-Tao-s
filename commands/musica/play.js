const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const DisTube = require('distube')
const client = new Discord.Client()

module.exports = {
    
    run: async(client, message, args) => {

        const cancion = args.join(" ")

        if(!cancion) {
               
            const embed = new MessageEmbed()
            .setAuthor('Hu Tao´s Bot', client.user.avatarURL() )
            .addField("Error ❌ ", "Debes ingresar el nombre de una cancion o playlist", true)
            .setTimestamp() 
            embed.setColor("#FF0000")
        
            return message.channel.send(embed);
        }

        if(!message.member.voice.channel) {
               
            const embed = new MessageEmbed()
            .setAuthor('Hu Tao´s Bot', client.user.avatarURL() )
            .addField("Error ❌ ", "Debes de estar en un canal de voz para usar este comando", true)
            .setTimestamp() 
            embed.setColor("#FF0000")
        
            return message.channel.send(embed);
        }

        if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id){

            const embed = new MessageEmbed()
            .setAuthor('Hu Tao´s Bot', client.user.avatarURL() )
            .addField("Error ❌ ", "Debes de estar en el mismo canal que yo", true)
            .setTimestamp() 
            embed.setColor("#FF0000")
        
            return message.channel.send(embed);
        }
        
        client.distube.play(message, cancion)

    },
             
    config: {
        name: 'play',
        description: '',
        usage: '',
        category: 'musica',
        accessableby: '',
        cooldown:5,
        aliases: ['play', 'p'],
        Example: []
    }
}