module.exports = async (client) => {
    console.log(`${client.user.username} está en línea.`);
    client.user.setActivity(`!help en ${client.guilds.cache.size} servidores`, { type: 3 }); // type 3 is WATCHING
};
