const dotenv = require("dotenv");
const { Client } = require("discord.js");

dotenv.config();

const client = new Client();
const PREFIX = "&";

client.on("message", (message) => {
  if (message.author.bot) return;
  const messageContent = message.content;

  if (messageContent.startsWith(PREFIX)) {
    const [command, ...args] = messageContent.substring(1).split(/\s+/);

    message.channel.send(`Comando: ${command} - args: ${args}`);
  }
});

client.login(process.env.BOT_TOKEN);
