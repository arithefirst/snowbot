const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
  data: new SlashCommandBuilder()
    .setName("announce")
    .setDescription("Sends an announcement")
    .addStringOption((option) => option.setName("title").setDescription("Embed title").setRequired(true))
    .addStringOption((option) => option.setName("body").setDescription("Embed body").setRequired(true))
    .addBooleanOption((option) => option.setName("everyone").setDescription("Wether to ping everyone or not").setRequired(true)),

  async execute(interaction) {
    const announcement = new EmbedBuilder()
      .setColor(0xcbe2f2)
      .setTitle(interaction.options.getString("title"))
      .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL({ size: 128 }), url: "https://twitch.tv/iittlesnow" })
      .setDescription(interaction.options.getString("body"))
      .setTimestamp()
      .setFooter({ text: `© Snowbot ${new Date().getFullYear()}` });
    // Set "content" to contain the everyone ping if the everyone bool is set to true
    let content;
    if (interaction.options.getBoolean("everyone") == true) {
      content = { content: "@everyone", allowedMentions: { parse: ["everyone"] }, embeds: [announcement] };
    } else {
      content = { embeds: [announcement] };
    }

    await interaction.reply(content);
  },
};
