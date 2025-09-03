const mongoose = require('mongoose');
let URLDB = "mongodb+srv://Mango:Steven91031427901.@bot.wgcsy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

module.exports = mongoose.connect(URLDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  //mBGTHvbhuNKnyMJW
  console.log("Se ha conectado a la base de datos")
});