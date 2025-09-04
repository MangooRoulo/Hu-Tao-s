# Variables Clave de Discord.js v14

Este documento lista algunas de las variables y propiedades más comunes y útiles que puedes encontrar al desarrollar con `discord.js` v14. Comprender estos objetos te permitirá interactuar eficazmente con la API de Discord.

## 1. `client` (Objeto del Bot)

El objeto `client` representa tu bot en sí mismo. Es el punto de partida para interactuar con Discord.

*   **`client.user`**: El usuario de Discord que representa a tu bot.
    *   `client.user.id`: ID del bot.
    *   `client.user.username`: Nombre de usuario del bot.
    *   `client.user.tag`: Nombre de usuario y discriminador del bot (ej. `MiBot#1234`).
    *   `client.user.avatarURL()`: URL del avatar del bot.
*   **`client.guilds`**: Colección de todos los servidores (guilds) a los que el bot tiene acceso.
    *   `client.guilds.cache`: Una `Collection` de los objetos `Guild` cacheados por el bot.
    *   `client.guilds.cache.size`: Número de servidores en los que está el bot.
*   **`client.channels`**: Colección de todos los canales a los que el bot tiene acceso.
    *   `client.channels.cache`: Una `Collection` de los objetos `Channel` cacheados.
*   **`client.commands`**: `Collection` personalizada que almacena tus comandos (definida en tu `index.js`).
*   **`client.aliases`**: `Collection` personalizada que almacena los alias de tus comandos.
*   **`client.ws.ping`**: Latencia del websocket del bot a Discord en milisegundos.

## 2. `message` (Objeto del Mensaje)

El objeto `message` representa un mensaje enviado en Discord. Es uno de los objetos más utilizados en los manejadores de comandos.

*   **`message.author`**: El objeto `User` que envió el mensaje.
    *   `message.author.id`: ID del autor.
    *   `message.author.username`: Nombre de usuario del autor.
    *   `message.author.tag`: Nombre de usuario y discriminador del autor.
    *   `message.author.bot`: `true` si el autor es un bot, `false` en caso contrario.
*   **`message.channel`**: El objeto `Channel` donde se envió el mensaje.
    *   `message.channel.id`: ID del canal.
    *   `message.channel.name`: Nombre del canal.
    *   `message.channel.type`: Tipo de canal (ej. `DM`, `GUILD_TEXT`).
    *   `message.channel.send({ content: 'texto' })`: Envía un mensaje de texto al canal.
    *   `message.channel.send({ embeds: [embed] })`: Envía un embed al canal.
*   **`message.guild`**: El objeto `Guild` (servidor) donde se envió el mensaje (solo si es un mensaje de servidor).
    *   `message.guild.id`: ID del servidor.
    *   `message.guild.name`: Nombre del servidor.
*   **`message.member`**: El objeto `GuildMember` del autor en el servidor (solo si es un mensaje de servidor).
    *   `message.member.displayName`: Nombre de visualización del miembro en el servidor.
    *   `message.member.roles.cache`: Colección de roles del miembro.
*   **`message.content`**: El contenido de texto del mensaje.
*   **`message.reply('respuesta')`**: Responde al mensaje del autor, mencionándolo.
*   **`message.delete()`**: Elimina el mensaje (requiere permisos).

## 3. `args` (Argumentos del Comando)

En tu estructura de comandos, `args` es un array de strings que contiene las palabras o frases que siguen al nombre del comando.

*   `args[0]`: El primer argumento.
*   `args[1]`: El segundo argumento.
*   `args.join(' ')`: Une todos los argumentos en una sola cadena de texto.
*   `args.length`: Número de argumentos.

## 4. `MessageEmbed` (Clase para Mensajes Enriquecidos)

La clase `MessageEmbed` se utiliza para construir mensajes enriquecidos (embeds) que son visualmente más atractivos y organizados.

*   `new MessageEmbed()`: Crea una nueva instancia de embed.
*   **`.setTitle('Título')`**: Establece el título del embed.
*   **`.setDescription('Descripción')`**: Establece la descripción principal del embed.
*   **`.setColor('COLOR')`**: Establece el color de la barra lateral del embed (ej. `'#FF0000'`, `'RANDOM'`, `'BLUE'`).
*   **`.setAuthor({ name: 'Nombre', iconURL: 'url_icono' })`**: Establece el autor del embed con nombre e icono.
*   **`.setThumbnail('url_imagen')`**: Establece una imagen en miniatura en la esquina superior derecha.
*   **`.setImage('url_imagen')`**: Establece una imagen grande en la parte inferior del embed.
*   **`.setFooter({ text: 'Texto del pie', iconURL: 'url_icono' })`**: Establece el pie de página con texto e icono.
*   **`.setTimestamp()`**: Añade la marca de tiempo actual al embed.
*   **`.addFields({ name: 'Nombre del Campo', value: 'Valor del Campo', inline: true/false })`**: Añade campos al embed para información organizada.

## 5. `Guild` (Objeto del Servidor)

El objeto `Guild` representa un servidor de Discord.

*   `guild.id`: ID del servidor.
*   `guild.name`: Nombre del servidor.
*   `guild.iconURL()`: URL del icono del servidor.
*   `guild.memberCount`: Número total de miembros en el servidor.
*   `guild.channels.cache`: Colección de canales del servidor.
*   `guild.members.cache`: Colección de miembros del servidor.

## 6. `User` (Objeto de Usuario)

El objeto `User` representa a un usuario de Discord.

*   `user.id`: ID del usuario.
*   `user.username`: Nombre de usuario.
*   `user.tag`: Nombre de usuario y discriminador.
*   `user.avatarURL()`: URL del avatar del usuario.
*   `user.bot`: `true` si es un bot.

## 7. `GuildMember` (Objeto de Miembro del Servidor)

El objeto `GuildMember` representa un usuario dentro de un servidor específico.

*   `member.id`: ID del miembro (igual que `user.id`).
*   `member.displayName`: Nombre de visualización del miembro en ese servidor (puede ser un apodo).
*   `member.roles.cache`: Colección de roles que el miembro tiene en el servidor.
*   `member.voice.channel`: El canal de voz en el que está el miembro (si está en uno).

## Notas Importantes:

*   **`cache`**: Muchas colecciones de `discord.js` usan `.cache` para acceder a elementos que ya han sido cargados en la memoria del bot. Si un elemento no está en caché, es posible que debas usar métodos como `fetch()` para obtenerlo de la API de Discord.
*   **Intents**: Recuerda que para acceder a cierta información (como el contenido de los mensajes, presencias o miembros de forma detallada), debes declarar los `GatewayIntentBits` correspondientes al inicializar tu cliente y habilitarlos en el [Portal de Desarrolladores de Discord](https://discord.com/developers/applications).
*   **Promesas**: Muchas operaciones de `discord.js` son asíncronas y devuelven `Promises`. Asegúrate de usar `async/await` o `.then().catch()` para manejarlas correctamente.
