const { readdirSync } = require('fs'); // 1 Importa función para leer directorios

module.exports = (client) => { // 3 Exporta el handler de comandos
    const load = dirs => { // 4 Función para cargar comandos de una carpeta específica
        const commands = readdirSync(`./commands/${dirs}/`).filter(file => file.endsWith('.js')); // 5 Lee archivos .js de la carpeta
        for (let file of commands) { // 6 Itera sobre cada archivo de comando
            let pull = require(`../commands/${dirs}/${file}`); // 7 Importa el archivo del comando
            client.commands.set(pull.config.name, pull); // 8 Registra el comando en la colección
            if (pull.config.aliases) pull.config.aliases.forEach(a => client.aliases.set(a, pull.config.name)); // 9 Registra aliases del comando
        }
    };
    ['Utilidad'].forEach(x => load(x)); // 12 Carga comandos de cada categoría (añade más carpetas aquí)
};
