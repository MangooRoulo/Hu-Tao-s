const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const prefix = require('../../config.json');
const moment = require('moment');
require('moment-duration-format');

module.exports = {
    run: async(client, message, args, actividad) => {
        let link = message.guild.iconURL({ format: 'png', dynamic: true, size: 2048 });
                
        if (!args[0]) {
            const actividad = moment.duration(client.uptime).format(' D [dias], H [hrs], m [mins], s [secs]');
            const embed = new MessageEmbed()

        
            .setAuthor("Hu Tao´s Bot", client.user.avatarURL())
            .setThumbnail(link) //Logo server
            .addField("Desarrolladores 💻 ", `Mango_#4078 y Martinez#5316`)
            .addField("UID 🔒 ", "`"+client.user.id+"`", true)
            .addField("Prefix ✍️ ", "`"+prefix.prefix+"`", true)
            .addField(`Libreria 🗂️ `, "`"+Discord.version+"`", true)//Version
            .addField("Servidores 🌐 ", ` ${client.guilds.cache.size}`, true)//Cantidad de SV
            .addField("Usuarios 👨‍👨‍👧‍👦 ", message.guild.memberCount.toString(), true)//Cantidad de usuarios on
            .addField("Tiempo Activo 🕒 ", ` ${actividad}`, true)//Tiempo de Actividad
            .addField("Ram 💾 ", ` ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)//aqui va la ram osea la memoria que usa tu bot
            .addField("Ping 🏓", client.ws.ping, true)
            .addField("Jose Chupa pitos? 👙 ", 'Si', true)
            embed.setColor("RANDOM")
        
            return message.channel.send(embed);
        } 
    },
                       
    config: {
        name: 'StatsBot',
        description: 'Ver las estadisticas del bot',
        usage: '',
        category: 'Utilidad',
        accessableby: 'Usuarios',
        cooldown:5,
        aliases: ['stats', 's', 'STAST', 'Stats'],
        Example: []
    }
}