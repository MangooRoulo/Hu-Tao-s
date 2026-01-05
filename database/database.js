const mongoose = require('mongoose'); // 1 Importa Mongoose para conexión con MongoDB
const config = require('../config.json'); // 2 Importa configuración con la URI de MongoDB

module.exports = async () => { // 4 Función asíncrona para conectar a la base de datos
    if (!config['mongodb-uri'] || config['mongodb-uri'] === 'TU_URI_DE_MONGODB_AQUI') { // 5 Verifica que la URI esté configurada
        console.warn('[DATABASE] ⚠️ URI de MongoDB no configurada en config.json'); // 6 Advertencia si no está configurada
        return; // 7 Sale sin intentar conectar
    }

    try { // 9 Intenta la conexión
        mongoose.set('strictQuery', true); // 10 Habilita modo estricto para queries
        await mongoose.connect(config['mongodb-uri']); // 11 Conecta a MongoDB usando la URI del config
        console.log('[DATABASE] ✅ Conectado a MongoDB correctamente'); // 12 Log de éxito
    } catch (error) { // 13 Captura errores de conexión
        console.error('[DATABASE] ❌ Error al conectar a MongoDB:', error.message); // 14 Log del error
        process.exit(1); // 15 Termina el proceso si no puede conectar (crítico)
    }

    mongoose.connection.on('disconnected', () => { // 18 Evento de desconexión
        console.warn('[DATABASE] ⚠️ Desconectado de MongoDB, intentando reconectar...'); // 19 Log de desconexión
    });

    mongoose.connection.on('reconnected', () => { // 22 Evento de reconexión exitosa
        console.log('[DATABASE] ✅ Reconectado a MongoDB'); // 23 Log de reconexión
    });
};
