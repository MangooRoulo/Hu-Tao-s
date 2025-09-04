const connectDB = require('./database/database');
const { GatewayIntentBits, Client, Collection, Partials } = require('discord.js');
const config = require('./config.json');
const client = new Client({intents: 131071});

client.commands = new Collection();
client.aliases = new Collection();
client.level = new Collection();
client.cachedMessageReactions = new Collection();

['command', 'event'].forEach(handler => require(`./handlers/${handler}`)(client));

client.login(config.token);

connectDB();
