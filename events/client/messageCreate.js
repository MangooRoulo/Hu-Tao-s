const config = require('../../config.json');
const { Collection, EmbedBuilder } = require("discord.js");
const MessageModel = require("../../database/models/prefix.js");
const cooldowns = new Collection();

module.exports = async (client, message) => {
    if (message.author.bot || !message.guild) return;

    let guildConfig = await MessageModel.findOne({ guildId: message.guild.id });
    let prefix = guildConfig ? guildConfig.prefix : config.prefix;

    if (message.content.match(`^<@!?${client.user.id}>( |)$`)) {
        const embed = new EmbedBuilder()
            .setDescription(`Mi prefix en este server es **${prefix}**`)
            .setColor('Random');
        return message.channel.send({ embeds: [embed] });
    }

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmdName = args.shift().toLowerCase();

    const command = client.commands.get(cmdName) || client.commands.get(client.aliases.get(cmdName));

    if (!command) {
        return message.channel.send(`**No encuentro ese comando o no existe**`);
    }

    // Cooldowns
    if (!config.devs.includes(message.author.id)) {
        if (!cooldowns.has(command.config.name)) {
            cooldowns.set(command.config.name, new Collection());
        }
        const now = Date.now();
        const timestamps = cooldowns.get(command.config.name);
        const cooldownAmount = (command.config.cooldown || 5) * 1000; // Cooldown en milisegundos

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`Por favor espera ${timeLeft.toFixed(1)} segundo(s) antes de usar el comando \`${command.config.name}\` de nuevo.`);
            }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }

    try {
        command.run(client, message, args);
    } catch (error) {
        console.error(error);
        message.reply('Hubo un error al intentar ejecutar ese comando.');
    }
};
