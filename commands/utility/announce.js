const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("announce")
    .setDescription("Sends an announcement")
    .addStringOption((option) => option.setName("title").setDescription("Embed title").setRequired(true))
    .addStringOption((option) => option.setName("body").setDescription("Embed body").setRequired(true))
    .addBooleanOption((option) => option.setName("everyone").setDescription("Wether to ping everyone or not").setRequired(true)),

  async execute(interaction) {
    // Allow command execution only when the user has a role titled "Snowbot Administrator"
    if (interaction.member.roles.cache.some((role) => role.name === "Snowbot Administrator")) {
      const announcement = new EmbedBuilder()
        .setColor(0xcbe2f2)
        .setTitle(interaction.options.getString("title"))
        .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL({ size: 128 }), url: "https://twitch.tv/iittlesnow" })
        .setDescription(interaction.options.getString("body"))
        .setTimestamp()
        .setFooter({ text: `© Snowbot ${new Date().getFullYear()}` });

      if (interaction.options.getBoolean("everyone") == true) {
        interaction.reply({ content: "@everyone", allowedMentions: { parse: ["everyone"] }, embeds: [announcement] });
        console.log(`Announcement successfully sent by ${interaction.user.displayName}`);
      } else {
        interaction.reply({ embeds: [announcement] });
        console.log(`Announcement successfully sent by ${interaction.user.displayName}`);
      }
    } else {
      console.log(`${interaction.user.displayName} attempted to use /announce without permissions.`);
      await interaction.reply({ content: "You do not have permission to use thie command.", ephemeral: true });
    }
  },
};
