const config = require('../../config.json'); // 1 Importa configuración con prefix y devs
const { Collection, EmbedBuilder } = require("discord.js"); // 2 Importa Collection para cooldowns y EmbedBuilder para embeds
const PrefixModel = require("../../database/models/prefix.js"); // 3 Modelo de MongoDB para prefijos personalizados
const cooldowns = new Collection(); // 4 Colección para almacenar cooldowns de comandos

module.exports = async (client, message) => { // 6 Evento que se ejecuta con cada mensaje
    if (message.author.bot || !message.guild) return; // 7 Ignora mensajes de bots y DMs

    const guildConfig = await PrefixModel.findOne({ guildId: message.guild.id }); // 9 Busca prefix personalizado en DB
    const prefix = guildConfig?.prefix || config.prefix; // 10 Usa prefix de DB o el default de config

    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)?$`))) { // 12 Si mencionan al bot sin comando
        const embed = new EmbedBuilder() // 13 Crea embed informativo
            .setDescription(`📌 Mi prefix en este servidor es **\`${prefix}\`**\n\n💡 Usa **\`${prefix}help\`** para ver mis comandos.`)
            .setColor('#FF6B6B')
            .setThumbnail(client.user.displayAvatarURL());
        return message.reply({ embeds: [embed] }); // 17 Responde con el embed
    }

    if (!message.content.startsWith(prefix)) return; // 20 Ignora mensajes que no empiezan con el prefix

    const args = message.content.slice(prefix.length).trim().split(/ +/g); // 22 Extrae argumentos del mensaje
    const cmdName = args.shift().toLowerCase(); // 23 Obtiene el nombre del comando en minúsculas

    const command = client.commands.get(cmdName) || client.commands.get(client.aliases.get(cmdName)); // 25 Busca el comando por nombre o alias
    if (!command) return; // 26 Si no existe el comando, no hace nada (silencioso)

    if (!config.devs.includes(message.author.id)) { // 28 Si el usuario no es desarrollador, aplica cooldown
        if (!cooldowns.has(command.config.name)) cooldowns.set(command.config.name, new Collection()); // 29 Inicializa colección de cooldown para el comando
        
        const now = Date.now(); // 31 Timestamp actual
        const timestamps = cooldowns.get(command.config.name); // 32 Obtiene timestamps del comando
        const cooldownAmount = (command.config.cooldown || 3) * 1000; // 33 Cooldown en milisegundos (default 3s)

        if (timestamps.has(message.author.id)) { // 35 Verifica si el usuario está en cooldown
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount; // 36 Calcula tiempo de expiración
            if (now < expirationTime) { // 37 Si aún está en cooldown
                const timeLeft = ((expirationTime - now) / 1000).toFixed(1); // 38 Calcula tiempo restante
                return message.reply({ content: `⏳ Espera **${timeLeft}s** antes de usar \`${command.config.name}\` de nuevo.`, allowedMentions: { repliedUser: false } });
            }
        }
        timestamps.set(message.author.id, now); // 42 Registra el uso del comando
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); // 43 Elimina el cooldown después del tiempo
    }

    try { // 46 Intenta ejecutar el comando
        await command.run(client, message, args); // 47 Ejecuta el comando
    } catch (error) { // 48 Captura errores
        console.error(`[ERROR] Comando ${command.config.name}:`, error); // 49 Log del error
        message.reply({ content: '❌ Hubo un error al ejecutar este comando.', allowedMentions: { repliedUser: false } }); // 50 Notifica al usuario
    }
};
