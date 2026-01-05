const { readdirSync } = require('fs'); // 1 Importa función para leer directorios

module.exports = (client) => { // 3 Exporta el handler de eventos
    const load = dirs => { // 4 Función para cargar eventos de una carpeta específica
        const events = readdirSync(`./events/${dirs}/`).filter(file => file.endsWith('.js')); // 5 Lee archivos .js de la carpeta
        for (let file of events) { // 6 Itera sobre cada archivo de evento
            const evt = require(`../events/${dirs}/${file}`); // 7 Importa el archivo del evento
            let eName = file.split('.')[0]; // 8 Extrae el nombre del evento del nombre del archivo
            client.on(eName, evt.bind(null, client)); // 9 Registra el evento en el cliente
        }
    };
    ['client'].forEach(x => load(x)); // 12 Carga eventos de cada categoría (añade más carpetas aquí)
};
