require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const commands = [];
const commandsPath = path.join(__dirname, 'globalCommands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Collect global commands
for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  commands.push(command.data.toJSON());
}

// Add guild-specific commands (if any)
const guildCommands = [];
const guildCommandsPath = path.join(__dirname, 'guildCommands');
const guildCommandFiles = fs.readdirSync(guildCommandsPath).filter(file => file.endsWith('.js'));

// Collect guild-specific commands (if any)
for (const file of guildCommandFiles) {
  const command = require(path.join(guildCommandsPath, file));
  guildCommands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    // Sync global commands to the bot to use in DMS etc.
    console.log('Started refreshing global (/) commands.');
    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands }
    );
    console.log('Successfully reloaded global (/) commands.');

    // Sync guild-specific commands to the specified guild only
    if (guildId) {
      console.log(`Started refreshing guild-specific (/) commands for guild: ${guildId}.`);
      await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: guildCommands }
      );
      console.log('Successfully reloaded guild-specific (/) commands.');
    } else {
      console.warn('No GUILD_ID provided in .env. Skipping guild-specific commands sync.');
    }
  } catch (error) {
    console.error('Error syncing commands:', error);
  }
})();
