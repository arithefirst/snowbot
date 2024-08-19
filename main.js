const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

client.once(Events.ClientReady, (readyClient) => {
  console.log("  _________                    ___.           __   ");
  console.log(" /   _____/ ____   ______  _  _\\_ |__   _____/  |_ ");
  console.log(" \\_____  \\ /    \\ /  _ \\ \\/ \\/ /| __ \\ /  _ \\   __\\");
  console.log(" /        \\   |  (  <_> )     / | \\_\\ (  <_> )  |  ");
  console.log("/_______  /___|  /\\____/ \\/\\_/  |___  /\\____/|__|  ");
  console.log("        \\/     \\/                   \\/             ");
  console.log("---------------------------------------------------------");
  console.log("Developed by arithefirst for iittlesnow\n");
  console.log(`Bot Ready: Logged in as ${readyClient.user.tag}\n`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true });
    } else {
      await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
    }
  }
});

client.login(token);
