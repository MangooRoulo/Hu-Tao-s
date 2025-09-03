module.exports = async (client) => {
    console.log(client.user.tag + ' is online!');

    client.user.setActivity("Hu Tao | h!help", { type: 'WATCHING'}).catch(console.error);

    //cycle through the activities on a set interval
    //let activities = [ `${client.guilds.size} servers!`, `${client.channels.size} channels!`, `${client.users.size} users!` ], i = 0;
    //setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: "WATCHING" }), 15000);
}