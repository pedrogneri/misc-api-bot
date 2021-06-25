const dotenv = require("dotenv");
const { Client } = require("discord.js");
const commands = require("./commands");

dotenv.config();

const client = new Client();
const PREFIX = "!";

client.on("message", async (message) => {
  if (message.author.bot) return;
  const messageContent = message.content;

  if (messageContent.startsWith(PREFIX)) {
    const [cmd, ...args] = messageContent.substring(1).split(/\s+/);
    await commands[cmd](message, args);
  }
});

client.login(process.env.BOT_TOKEN);
