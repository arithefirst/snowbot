const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("twitter").setDescription("Produces the link to Snow's Twitter (x)"),

  async execute(interaction) {
    await interaction.reply("https://twitter.com/iittlesnow");
  },
};
