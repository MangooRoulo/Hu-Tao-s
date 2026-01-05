const mongoose = require('mongoose'); // 1 Importa Mongoose para modelado de datos MongoDB

const PrefixSchema = new mongoose.Schema({ // 3 Define el esquema para prefijos personalizados por servidor
    guildId: { type: String, required: true, unique: true }, // 4 ID del servidor (único e indexado)
    prefix: { type: String, required: true, maxlength: 5 } // 5 Prefijo personalizado (máximo 5 caracteres)
});

module.exports = mongoose.model('prefix', PrefixSchema); // 8 Exporta el modelo de Mongoose
