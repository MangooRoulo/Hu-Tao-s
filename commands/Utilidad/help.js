const { MessageEmbed } = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        let link = message.guild.iconURL({ format: 'png', dynamic: true, size: 2048 });

        let algo = await MessageModel.findOne({ guildId: message.guild.id }).exec()
        let prefix = 'h!'

        if (!args[0]) {
            const embed = new MessageEmbed()
                .setTitle("Lista de comandos disponibles")
                .setColor("#f2d7ff")
                .setThumbnail(link)
                .setDescription(`Esta es mi lista de comandos disponibles, mi prefix es: \`${prefix}\`. Si no sabes utilizar un comando utiliza \`${prefix}help <comando>\` y te explicara como utilizar el comando.\nComandos en Total: **${client.commands.size}**`)
                .addField('**❯ Administrador [9]**', "`aceptar` `addreactinrole` `config` `denegar` `setautorole` `setconfesion` `setprefix` `setsuggest` `setwelcome`")
                .addField('**❯ Niveles [8]**', "`editnivel` `nivel` `setcolor` `setimg` `setnivel` `setnivelrol` `setnotif` `top`")
                .addField('**❯ Utilidad [4]**', "`confesion` `help` `suggest` `stats`")

            return message.channel.send(embed);
        } else {
            let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase());

            if (!command) {
                message.delete();

                const embed2 = new MessageEmbed()

                return message.channel.send(embed2.setTitle("Comando invalido.").setColor("RED").setDescription(`Usa:  \`${prefix}help\` para ver la lista de comando!`));
            }

            command = command.config;

            const embed3 = new MessageEmbed()
            embed3.setDescription(stripIndents`El prefijo es: \`${prefix}\`\n
        **Comando:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
        **Descripción:** ${command.description || "No tiene"}
        **Usar:** ${prefix}${command.usage ? `\`${command.usage}\`` : "No tiene"}
        **Accesible por:** ${command.accessableby || "Miembros"}
        **Cooldown:** ${command.cooldown ? `\`${command.cooldown.toFixed(1)}\`` : "No tiene"}
        **Alias:** ${command.aliases ? command.aliases.join(", ") : "No hay"}
        **Ejemplo:** ${command.Example ? command.Example.join(`\n`) : "No hay"}`)
            embed3.setColor("#d276fd")

            return message.channel.send(embed3);
        }

    },
    config: {
        name: 'help',
        description: 'Lista de comandos del bot',
        usage: 'help <commando>',
        category: 'Utilidad',
        accessableby: 'Miembros',
        cooldown: 5,
        aliases: ['h', 'HELP', 'Help', 'ayuda', 'Ayuda', 'AYUDA'],
        Example: ["```" + 'help suggest' + "```"]
    }
}