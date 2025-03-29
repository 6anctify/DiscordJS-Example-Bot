// Example event handler
// OnGuildMemberAdd

const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        console.log(`New member joined: ${member.user.tag}`);	
    }
};
