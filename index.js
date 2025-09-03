/******* beginning of bot *******/
require('./database/database')
const { MessageEmbed } = require('discord.js');
const { Client, Collection } = require('discord.js');
const config = require('./config.json')
const client = new Client({ partials: ['MESSAGE', 'REACTION', 'CHANNEL', 'GUILD_MEMBER', 'USER']});

client.level = new Collection();
client.cachedMessageReactions = new Collection();

['commands', 'aliases'].forEach(collection => client[collection] = new Collection());//loop through commands and aliases
['command', 'event'].forEach(handler => require(`./handlers/${handler}`)(client));//loop through contents of handlers folder

client.ssn=function(n) {
    if (typeof n !=='number') return n
    if (n <= 1e4) return n
    if (n <= 1e6) return (n / 1e3).toFixed(1) + 'K'
    if (n <= 1e9) return (n / 1e6).toFixed(2) + 'M'
}

 //Distube
 const DisTube = require('distube')
 client.distube = new DisTube(client, {
     emitNewSongonly: true,
     searchSongs: false,
     leaveOnStop: false,
     leaveOnFinish: false,
     leaveOnEmpty: true
 });

 //Distube eventos
  client.distube.on("addlist", (message, queue, playlist) => {
      
        const embed = new MessageEmbed()
        .setAuthor('Hu Tao´s Bot', client.user.avatarURL() )
        .addField("Playlist", `\`${playlist.name}\``) 
        embed.setColor("#00FF32")
   
    return message.channel.send(embed);
})
    client.distube.on("addSong", (message, queue, song) => {

        const embed = new MessageEmbed()
        .setAuthor('Hu Tao´s Bot', client.user.avatarURL() )
        .addField("Añadido a la cola ↩️", `\`${song.name}\` - \`${song.formattedDuration}\``) 
        .setTimestamp() 
        .setFooter(`Añadido por, ${message.author.tag}`)
        embed.setColor("#00FF32")

    return message.channel.send(embed);

})
 client.distube.on("playSong", (message, queue, playsong) => {

        const embed = new MessageEmbed()
        .setAuthor('Hu Tao´s Bot', client.user.avatarURL() )
        .addField("Reproduciendo Ahora 🔊", `\`${playsong.name}\` - \`${playsong.formattedDuration}\``) 
        .setThumbnail(playsong.url)
        .setTimestamp() 
        embed.setColor("#00FF32")
        .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    return message.channel.send(embed);
 })

 client.distube.on("playList", (message, queue, playlist) => {
        const embed = new MessageEmbed()
        .setAuthor('Hu Tao´s Bot', client.user.avatarURL() )
        .addField("Reproduciendo Playlist 🔊", `\`${playlist.name}\``) 
        embed.setColor("#00FF32")

    return message.channel.send(embed);
 }) 

 client.distube.on('initQueue', (queue) => {
     queue.autoplay = false;
     queue.volume = 100
 })

client.login(config.token);