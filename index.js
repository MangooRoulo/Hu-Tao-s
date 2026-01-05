const connectDB = require('./database/database'); // Conexión a MongoDB
const { GatewayIntentBits, Client, Collection, Partials } = require('discord.js'); // Importa clases de discord.js
const config = require('./config.json'); // Archivo de configuración con token y prefijo

const client = new Client({ // Crea el cliente de Discord con los intents necesarios
    intents: [
        GatewayIntentBits.Guilds, // Acceso a información de servidores
        GatewayIntentBits.GuildMessages, // Lectura de mensajes en servidores
        GatewayIntentBits.MessageContent, // Acceso al contenido de mensajes (requiere intent privilegiado)
        GatewayIntentBits.GuildMembers, // Información de miembros del servidor
        GatewayIntentBits.GuildMessageReactions // Reacciones en mensajes
    ]
});

client.commands = new Collection(); // Colección para almacenar comandos
client.aliases = new Collection(); // Colección para almacenar aliases de comandos
client.level = new Collection(); // Colección para sistema de niveles
client.cachedMessageReactions = new Collection(); // Cache de reacciones

['command', 'event'].forEach(handler => require(`./handlers/${handler}`)(client)); // Carga handlers dinámicamente

client.login(config.token); // Inicia sesión con el token del bot

connectDB(); // Conecta a la base de datos MongoDB
