# Documentación del Bot de Discord (Discord.js v14)

Este documento describe la estructura y funcionalidad del bot de Discord, construido con `discord.js` v14 y `mongoose` para la persistencia de datos.

## 📁 Estructura del Proyecto

```
. (raíz del bot)
├── commands/          # Contiene todos los comandos del bot, organizados por categorías.
│   └── Utilidad/      # Categoría de comandos de utilidad (ejemplo: ping.js).
├── database/          # Configuración y modelos de la base de datos MongoDB.
│   ├── models/        # Esquemas de Mongoose para la base de datos.
│   └── database.js    # Script de conexión a MongoDB.
├── events/            # Manejadores de eventos de Discord.
│   └── client/        # Eventos que el cliente del bot escucha (ejemplo: clientReady.js, messageCreate.js).
├── handlers/          # Scripts para cargar comandos y eventos dinámicamente al inicio del bot.
│   ├── command.js     # Lógica para cargar los archivos de comandos.
│   └── event.js       # Lógica para cargar los archivos de eventos.
├── config.json        # Archivo de configuración principal del bot.
├── index.js           # Punto de entrada principal del bot.
├── package.json       # Metadata del proyecto y lista de dependencias.
├── package-lock.json  # Bloquea las versiones de las dependencias instaladas.
└── documentacion.md   # Este archivo de documentación.
└── variables.md       # Listado de variables útiles de discord.js v14.
```

## 📄 Documentación por Archivo

A continuación, se detalla el propósito y el código clave de cada archivo.

### `index.js`

Este es el punto de entrada principal de tu bot. Se encarga de inicializar el cliente de Discord, cargar los manejadores (comandos y eventos) y establecer la conexión a la base de datos.

```javascript
// Importa la función de conexión a la base de datos de MongoDB
const connectDB = require('./database/database');

// Importa clases y bits de intenciones necesarios de discord.js
const { GatewayIntentBits, Client, Collection, Partials } = require('discord.js');

// Carga el archivo de configuración principal del bot
const config = require('./config.json');

// Crea una nueva instancia del cliente de Discord
const client = new Client({
    // Define qué tipos de eventos parciales debe manejar el bot (útil para reacciones, mensajes no cacheados, etc.)
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
        Partials.GuildMember,
        Partials.User
    ],
    // Define los intents (intenciones) que el bot requiere para operar y recibir eventos específicos de Discord
    intents: [
        GatewayIntentBits.Guilds,           // Para recibir eventos relacionados con servidores (guilds)
        GatewayIntentBits.GuildMessages,    // Para recibir eventos relacionados con mensajes en servidores
        GatewayIntentBits.MessageContent,   // CRÍTICO en v14: para leer el contenido de los mensajes (requiere activación en el Portal de Desarrolladores)
        GatewayIntentBits.GuildVoiceStates, // Para recibir eventos relacionados con estados de voz (necesario para funciones de música)
        GatewayIntentBits.GuildMembers,     // Para acceder a información de miembros del servidor (requiere activación en el Portal de Desarrolladores)
        GatewayIntentBits.GuildPresences    // Para acceder a información de presencia de miembros (requiere activación en el Portal de Desarrolladores)
    ]
});

// Inicializa colecciones para almacenar comandos, alias, niveles y reacciones de mensajes en caché
client.commands = new Collection(); // Almacena los comandos del bot
client.aliases = new Collection();  // Almacena los alias de los comandos
client.level = new Collection();    // Puede ser usado para un sistema de niveles (actualmente no implementado completamente aquí)
client.cachedMessageReactions = new Collection(); // Para almacenar reacciones de mensajes si es necesario

// Carga los manejadores de comandos y eventos
// `require` los scripts de `handlers` y les pasa el objeto `client`
['command', 'event'].forEach(handler => require(`./handlers/${handler}`)(client));

// Inicia sesión en Discord usando el token del bot del archivo de configuración
client.login(config.token);

// Llama a la función para conectar el bot a la base de datos MongoDB
connectDB();
```

### `config.json`

Este archivo JSON contiene la configuración esencial para el bot, como el token de Discord, la clave de API de YouTube, el prefijo de los comandos, emojis personalizados y una lista de IDs de desarrolladores.

```json
{
    "token": "TU_TOKEN_DE_BOT_AQUI", // El token secreto de tu bot de Discord (¡NO COMPARTIR!)
    "youtube-api": "TU_API_KEY_DE_YOUTUBE_AQUI", // Clave de API de YouTube para funcionalidades relacionadas (si se usa)
    "prefix": "!", // El prefijo por defecto que el bot usará para reconocer comandos
    "emoji": { // Objeto que contiene emojis para diferentes estados o acciones del bot
        "play": "▶️",
        "stop": "⏹️",
        "queue": "📄",
        "success": "☑️",
        "repeat": "🔁",
        "error": "❌"
      },
    "devs": [] // Un array de IDs de usuario de Discord que se consideran desarrolladores (pueden tener privilegios especiales, como bypass de cooldown)
}
```

### `package.json`

Define los metadatos del proyecto y lista las dependencias necesarias. `npm install` lee este archivo para instalar los paquetes.

```json
{
  "dependencies": { // Lista de librerías de las que depende tu proyecto
    "discord.js": "^14.22.1", // La librería principal para interactuar con la API de Discord
    "mongodb": "^6.19.0",      // Driver oficial de MongoDB para Node.js (Mongoose lo usa internamente)
    "mongoose": "^8.18.0"     // ODM (Object Data Modeling) para MongoDB, simplifica la interacción con la base de datos
  }
}
```

### `database/database.js`

Este archivo se encarga de establecer y manejar la conexión a tu base de datos MongoDB utilizando Mongoose.

```javascript
const mongoose = require('mongoose'); // Importa la librería Mongoose

// URL de conexión a tu base de datos MongoDB. ¡Reemplaza con tu propia URL y credenciales!
let URLDB = "mongodb+srv://johanariaspu_db_user:aTspTFWul5a9DPHg@discordbot.0cbiejx.mongodb.net/?retryWrites=true&w=majority&appName=DiscordBot";

// Exporta una función asíncrona que se encarga de conectar a la base de datos
module.exports = async () => {
  try {
    // Intenta conectar a MongoDB usando la URL y opciones de configuración
    await mongoose.connect(URLDB, {
      // useNewUrlParser: true, // Opciones deprecadas en Mongoose v6+; se pueden eliminar o comentar
      // useUnifiedTopology: true // Opciones deprecadas en Mongoose v6+; se pueden eliminar o comentar
    });
    console.log("Se ha conectado a la base de datos"); // Mensaje de éxito en la consola
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error); // Mensaje de error si la conexión falla
  }
};
```

### `database/models/prefix.js`

Define el esquema de Mongoose para almacenar prefijos de bot personalizados por servidor en la base de datos.

```javascript
const mongoose = require('mongoose'); // Importa la librería Mongoose

// Define el esquema para los prefijos de los mensajes
const MessageSchema = new mongoose.Schema({
    guildId: { type: String, required: true }, // ID del servidor (guild) de Discord, requerido y único
    prefix: { type: String, required: true }  // El prefijo personalizado para ese servidor, requerido
});

// Crea y exporta el modelo de Mongoose basado en el esquema, llamado 'prefix'
const MessageModel = module.exports = mongoose.model('prefix', MessageSchema);
```

### `handlers/command.js`

Este manejador escanea las subcarpetas dentro de `commands/` y carga todos los archivos de comandos encontrados en las colecciones `client.commands` y `client.aliases` del bot.

```javascript
const { readdirSync } = require('fs'); // Importa la función `readdirSync` del módulo 'fs' para leer directorios

module.exports = (client) => { // La función principal que se exporta y recibe el objeto `client` del bot
    const load = dirs => { // Define una función interna `load` para cargar comandos de un directorio específico
        // Lee el contenido del directorio de comandos y filtra solo los archivos `.js`
        const commands = readdirSync(`./commands/${dirs}/`).filter(file => file.endsWith('.js'));
        for (let file of commands) { // Itera sobre cada archivo de comando
            let pull = require(`../commands/${dirs}/${file}`); // Requiere el archivo de comando
            client.commands.set(pull.config.name, pull); // Almacena el comando en la colección `client.commands` usando su nombre
            // Si el comando tiene alias, los almacena en la colección `client.aliases`
            if (pull.config.aliases) pull.config.aliases.forEach(a => client.aliases.set(a, pull.config.name));
        }
    };
    // Itera sobre las categorías de comandos y carga los comandos de cada una
    // ¡Asegúrate de que este array contenga los nombres de tus carpetas de categorías de comandos!
    ['Utilidad'].forEach(x => load(x));
};
```

### `handlers/event.js`

Similar al manejador de comandos, este script escanea las subcarpetas dentro de `events/` y registra todos los archivos de eventos con el cliente de Discord.

```javascript
const { readdirSync } = require('fs'); // Importa la función `readdirSync` del módulo 'fs' para leer directorios

module.exports = (client) => { // La función principal que se exporta y recibe el objeto `client` del bot
    const load = dirs => {     // Define una función interna `load` para cargar eventos de un directorio específico
        // Lee el contenido del directorio de eventos y filtra solo los archivos `.js`
        const events = readdirSync(`./events/${dirs}/`).filter(file => file.endsWith('.js'));
        for (let file of events) { // Itera sobre cada archivo de evento
            const evt = require(`../events/${dirs}/${file}`); // Requiere el archivo de evento
            let eName = file.split('.')[0]; // Obtiene el nombre del evento (ej. 'clientReady' de 'clientReady.js')
            client.on(eName, evt.bind(null, client)); // Registra el evento con el cliente de Discord
        }
    };
    // Itera sobre las categorías de eventos y carga los eventos de cada una
    // ¡Asegúrate de que este array contenga los nombres de tus carpetas de categorías de eventos!
    ['client'].forEach(x => load(x));
};
```

### `events/client/clientReady.js`

Este archivo define el manejador para el evento `clientReady` de Discord. Se ejecuta una vez que el bot ha iniciado sesión exitosamente y está listo para operar.

```javascript
module.exports = async (client) => { // La función se ejecuta cuando el evento `clientReady` es emitido, recibiendo el objeto `client`
    console.log(`${client.user.username} está en línea.`); // Registra en la consola que el bot está en línea
    // Establece la actividad del bot. 'type: 3' corresponde a `ActivityType.Watching` en discord.js v14.
    client.user.setActivity(`!help en ${client.guilds.cache.size} servidores`, { type: 3 });
};
```

### `events/client/messageCreate.js`

Este archivo define el manejador para el evento `messageCreate` de Discord. Se dispara cada vez que un mensaje es enviado en un canal al que el bot tiene acceso. Es donde se procesan los comandos del bot.

```javascript
const config = require('../../config.json'); // Importa el archivo de configuración
const { Collection, MessageEmbed } = require("discord.js"); // Importa Collection y MessageEmbed de discord.js
const MessageModel = require("../../database/models/prefix.js"); // Importa el modelo de prefijo de la base de datos
const cooldowns = new Collection(); // Colección para manejar los cooldowns de los comandos

module.exports = async (client, message) => { // La función se ejecuta en cada mensaje recibido
    // Ignora mensajes de bots y mensajes que no provienen de un servidor (DM)
    if (message.author.bot || !message.guild) return;

    // Obtiene el prefijo personalizado del servidor o usa el prefijo por defecto del archivo de configuración
    let guildConfig = await MessageModel.findOne({ guildId: message.guild.id });
    let prefix = guildConfig ? guildConfig.prefix : config.prefix;

    // Si el bot es mencionado, responde con su prefijo actual
    if (message.content.match(`^<@!?${client.user.id}>( |)$`)) {
        const embed = new MessageEmbed()
            .setDescription(`Mi prefix en este server es **${prefix}**`)
            .setColor('RANDOM');
        return message.channel.send({ embeds: [embed] }); // Envía el embed con el prefijo
    }

    // Si el mensaje no comienza con el prefijo del bot, ignóralo
    if (!message.content.startsWith(prefix)) return;

    // Divide el mensaje en argumentos para extraer el nombre del comando y sus parámetros
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmdName = args.shift().toLowerCase(); // Extrae el nombre del comando

    // Busca el comando en las colecciones `client.commands` o `client.aliases`
    const command = client.commands.get(cmdName) || client.commands.get(client.aliases.get(cmdName));

    // Si el comando no existe, informa al usuario y retorna
    if (!command) {
        return message.channel.send(`**No encuentro ese comando o no existe**`);
    }

    // Sistema de Cooldowns para evitar spam de comandos (los desarrolladores están exentos)
    if (!config.devs.includes(message.author.id)) {
        if (!cooldowns.has(command.config.name)) {
            cooldowns.set(command.config.name, new Collection()); // Crea una colección de cooldown si no existe para este comando
        }
        const now = Date.now(); // Tiempo actual
        const timestamps = cooldowns.get(command.config.name); // Timestamps de uso del comando por usuario
        // Cooldown en milisegundos (el valor de `command.config.cooldown` es en segundos, se convierte)
        const cooldownAmount = (command.config.cooldown || 5) * 1000;

        if (timestamps.has(message.author.id)) { // Si el usuario ya usó este comando recientemente
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount; // Calcula cuándo expira el cooldown
            if (now < expirationTime) { // Si el cooldown aún no ha expirado
                const timeLeft = (expirationTime - now) / 1000; // Calcula el tiempo restante
                return message.reply(`Por favor espera ${timeLeft.toFixed(1)} segundo(s) antes de usar el comando \`${command.config.name}\` de nuevo.`);
            }
        }
        timestamps.set(message.author.id, now); // Registra el uso del comando por el usuario
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); // Elimina el registro después del cooldown
    }

    try {
        command.run(client, message, args); // Ejecuta la función `run` del comando
    } catch (error) {
        console.error(error); // Registra cualquier error en la consola
        message.reply('Hubo un error al intentar ejecutar ese comando.'); // Informa al usuario sobre el error
    }
};
```

### `commands/Utilidad/ping.js`

Este es un comando de ejemplo que responde con la latencia del bot.

```javascript
const { MessageEmbed } = require('discord.js'); // Importa la clase MessageEmbed para crear mensajes enriquecidos

module.exports = { // Exporta el objeto del comando
    run: async(client, message, args) => { // La función principal del comando
        const embed = new MessageEmbed() // Crea una nueva instancia de MessageEmbed
            .setTitle('Pong!') // Establece el título del embed
            .setDescription(`La latencia del bot es de ${Math.round(client.ws.ping)}ms.`) // Establece la descripción con el ping del bot
            .setColor('RANDOM'); // Establece un color aleatorio para el embed
        message.channel.send({ embeds: [embed] }); // Envía el embed al canal donde se ejecutó el comando
    },
    config: { // Objeto de configuración del comando
        name: 'ping', // Nombre del comando (debe coincidir con el nombre del archivo sin .js)
        description: 'Verifica la latencia del bot.', // Descripción breve del comando
        usage: 'ping', // Ejemplo de uso del comando
        category: 'Utilidad', // Categoría a la que pertenece el comando
        accessableby: 'Miembros', // Rol mínimo o permiso para usar el comando
        cooldown: 5, // Cooldown del comando en segundos
        aliases: ['latencia'], // Alias del comando (nombres alternativos para ejecutarlo)
        Example: ["```!ping```"] // Ejemplos de uso del comando en formato de código
    }
};
```
