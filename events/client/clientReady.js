const { ActivityType } = require('discord.js'); // 1 Importa ActivityType para definir el tipo de actividad

module.exports = async (client) => { // 3 Evento que se ejecuta cuando el bot está listo
    console.log(`${client.user.username} está en línea.`); // 4 Muestra en consola que el bot se conectó
    client.user.setActivity(`!help en ${client.guilds.cache.size} servidores`, { // 5 Establece la actividad del bot
        type: ActivityType.Watching // 6 Tipo de actividad: Watching (Viendo)
    });
};
