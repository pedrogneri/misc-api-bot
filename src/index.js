const dotenv = require("dotenv");
const { Client } = require("discord.js");
const { poke } = require("./commands");

dotenv.config();

const client = new Client();
const PREFIX = "!";

client.on("message", async (message) => {
  if (message.author.bot) return;
  const messageContent = message.content;

  if (messageContent.startsWith(PREFIX)) {
    const [command, ...args] = messageContent.substring(1).split(/\s+/);
    let response;

    switch (command) {
      case poke.COMMAND:
        response = await poke.searchById(args);
        break;
      default:
        return;
    }

    message.channel.send(response);
  }
});

client.login(process.env.BOT_TOKEN);
