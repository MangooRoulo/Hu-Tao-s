const config = require('../../config.json')
const { Collection, MessageEmbed } = require("discord.js");
const MessageModel = require("../../database/models/prefix.js");
const cooldowns = new Collection();
const timer = new Collection();


module.exports = async (client, message,nolevel) => {
    if (message.author.bot || !message.guild) return; //if the message is sent by a bot or channel type is dm return
    // prefix
    let algo = await MessageModel.findOne({guildId: message.guild.id}).exec()
    let prefix = algo ? algo.prefix : 'h!'

    if(message.content.match(`^<@!?${client.user.id}>( |)$`)) {
      return message.channel.send(new MessageEmbed().setDescription(`Mi prefix en este server es **${prefix}**`).setColor('RANDOM'))
    }

    if(!message.content.startsWith(prefix)) return; //if the message does not start with the prefix return

    //separates the arguments to get the command name
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

    if(!commandFile){      
    return message.channel.send(`**No encuentro ese comando o no existe**`)
    }
    
 // cooldown
   
 if (!cooldowns.has(commandFile)) {
    cooldowns.set(commandFile, new Collection());
}
if (!config.devs.includes(message.author.id)) {
if (!cooldowns.has(commandFile)) {
    cooldowns.set(commandFile, new Collection());
}
const now = Date.now();
const timestamps = cooldowns.get(commandFile);
const cooldownAmount = Math.floor(cmd.cooldown || 5) * 100;
if (!timestamps.has(message.author.id)) {
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
}
else {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    const timeLeft = (expirationTime - now) / 100;
    if (now < expirationTime && timeLeft > 0.9) {
        return message.reply(`Porfavor espera ${timeLeft.toFixed(1)} para ejecurtar el \`${cmd}\` comando.`);
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
}

}

    if(commandFile){        
        commandFile.run(client, message, args); //run the command
    }
}