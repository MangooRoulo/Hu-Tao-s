const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const DisTube = require('distube')
const client = new Discord.Client()

module.exports = {
    
    run: async(client, message, args) => {
        
    if(!message.member.voice.channel) {

        const embed = new MessageEmbed()
            .setAuthor('Hu Tao´s Bot', client.user.avatarURL() )
            .addField("Error ❌ ", "Debes estar conectado a un canal de voz", true)
            .setTimestamp() 
            embed.setColor("#FF0000")
        
            return message.channel.send(embed);

    }

    const queue = client.distube.getQueue(message);

    if(!queue){

        const embed = new MessageEmbed()
            .setAuthor('Hu Tao´s Bot', client.user.avatarURL() )
            .addField("Error ❌ ", "No se esta reproduciendo música ahora", true)
            .setTimestamp() 
            embed.setColor("#FF0000")
        
            return message.channel.send(embed);

    } else {

        const embed = new MessageEmbed()
            .setAuthor('Hu Tao´s Bot', client.user.avatarURL() )
            //.addField(`Canciones en Cola `, `${queue.songs.map((song, id) => `${id ? id : ' '} ${song.name} - \`${song.formattedDuration}\``,).slice(0, 10).join('\n')}`,)
            .addField(`Canciones en Cola `, `${queue.songs.map((song, id) => ` ${song.name} - \`${song.formattedDuration}\``,).slice(0, 10).join('\n')}`,)
            .setTimestamp() 
            embed.setColor("RANDOM")
        
        return message.channel.send(embed);

    }


    },
             
    config: {
        name: 'queue',
        description: '',
        usage: '',
        category: 'musica',
        accessableby: '',
        cooldown:5,
        aliases: ['queue', 'q'],
        Example: []
    }
}