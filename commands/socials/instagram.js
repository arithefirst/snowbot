const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("instagram").setDescription("Produces the link to Snow's Instagram"),

  async execute(interaction) {
    await interaction.reply("https://www.instagram.com/iittlesnow/");
  },
};
