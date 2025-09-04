const mongoose = require('mongoose');
// Reemplaza con tu propia URL de conexión a MongoDB
let URLDB = "mongodb+srv://johanariaspu_db_user:aTspTFWul5a9DPHg@discordbot.0cbiejx.mongodb.net/?retryWrites=true&w=majority&appName=DiscordBot";
//usuario johanariaspu_db_user
//pas aTspTFWul5a9DPHg

module.exports = async () => {
  try {
    await mongoose.connect(URLDB, {
      // useNewUrlParser: true, // Deprecated en Mongoose v6+
      // useUnifiedTopology: true // Deprecated en Mongoose v6+
    });
    console.log("Se ha conectado a la base de datos");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};
