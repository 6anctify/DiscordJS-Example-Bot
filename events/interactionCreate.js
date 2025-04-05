const { Events } = require('discord.js');
const fs = require('fs');
const path = require('path');

const buttonHandlers = new Map();
const handlersPath = path.join(__dirname, '../buttonHandlers');
const handlerFiles = fs.readdirSync(handlersPath).filter(file => file.endsWith('.js'));

// Load handlers by base ID
for (const file of handlerFiles) {
    const handler = require(path.join(handlersPath, file));
    if (handler.customId && handler.execute) {
        const baseId = handler.customId.split('_')[0]; // just "show_avatar"
        buttonHandlers.set(baseId, handler);
    }
}

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if (interaction.isButton()) {
            const baseId = interaction.customId.split('_')[0];
            const handler = buttonHandlers.get(baseId);

            if (handler) {
                try {
                    await handler.execute(interaction);
                } catch (error) {
                    console.error(`Error executing handler for ${interaction.customId}:`, error);
                }
            } else {
                console.warn(`No handler found for interaction: ${interaction.customId}`);
                await interaction.reply({
                    content: 'Unknown interaction.',
                    ephemeral: true
                });
            }
            return;
        }

        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(`Error executing ${interaction.commandName}:`, error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error executing the command!', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'There was an error executing the command!', ephemeral: true });
                }
            }
        }
    },
};