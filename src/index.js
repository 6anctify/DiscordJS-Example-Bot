require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();

const commandFolders = [
  path.join(__dirname, '../commands/globalCommands/'),
  path.join(__dirname, '../commands/guildCommands/')
];

for (const commandsPath of commandFolders) {
  if (!fs.existsSync(commandsPath)) continue; 
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));

    if (command && command.data && command.data.name) {
      client.commands.set(command.data.name, command);
      console.log(`Loaded command: ${command.data.name} from ${commandsPath}`);
    } else {
      console.warn(`Skipping ${file} - invalid command structure.`);
    }
  }
}

const eventsPath = path.join(__dirname, '../events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

client.login(process.env.DISCORD_TOKEN)
  .then(() => console.log('Bot logged in!'))
  .catch(console.error);
