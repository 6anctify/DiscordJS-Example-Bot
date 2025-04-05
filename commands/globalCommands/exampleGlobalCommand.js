// This command returns the avatar of the specified user.
// Global command example

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Fetches the avatar of a specified Discord user.')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The user whose avatar you want to see.')
                .setRequired(true))
        .setIntegrationTypes(1)
        .setContexts(0, 1, 2),

    async execute(interaction) {
        const user = interaction.options.getUser('user');

        if (!user) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Error")
                        .setDescription("Could not fetch the user.")
                        .setColor("Red")
                ],
                ephemeral: true
            });
        }

        const avatarURL = user.displayAvatarURL({ size: 1024, dynamic: true });

        const embed = new EmbedBuilder()
            .setTitle(`${user.username}'s Avatar`)
            .setImage(avatarURL)
            .setColor("Blue")
            .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

        await interaction.reply({ embeds: [embed] });
    }
};
