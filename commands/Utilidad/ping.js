const { EmbedBuilder } = require('discord.js'); // 1 Importa EmbedBuilder para crear mensajes embebidos

module.exports = { // 3 Exporta el comando
    run: async (client, message, args) => { // 4 Función principal que ejecuta el comando
        const latency = Date.now() - message.createdTimestamp; // 5 Calcula latencia del mensaje
        const apiLatency = Math.round(client.ws.ping); // 6 Obtiene latencia del WebSocket de Discord
        
        const embed = new EmbedBuilder() // 8 Crea el embed de respuesta
            .setTitle('🏓 Pong!') // 9 Título del embed
            .setDescription(`📡 **Latencia del bot:** ${latency}ms\n💓 **Latencia de la API:** ${apiLatency}ms`) // 10 Muestra ambas latencias
            .setColor(apiLatency < 100 ? 'Green' : apiLatency < 200 ? 'Yellow' : 'Red') // 11 Color según latencia
            .setTimestamp() // 12 Añade timestamp
            .setFooter({ text: `Solicitado por ${message.author.tag}`, icon_url: message.author.displayAvatarURL() }); // 13 Footer con info del usuario
        
        message.channel.send({ embeds: [embed] }); // 15 Envía el embed
    },
    config: { // 17 Configuración del comando
        name: 'ping', // 18 Nombre del comando
        description: 'Verifica la latencia del bot y la API de Discord.', // 19 Descripción
        usage: 'ping', // 20 Uso del comando
        category: 'Utilidad', // 21 Categoría
        accessableby: 'Miembros', // 22 Quién puede usar el comando
        cooldown: 3, // 23 Tiempo de espera entre usos (segundos)
        aliases: ['latencia', 'pong', 'ms'] // 24 Aliases del comando
    }
};
