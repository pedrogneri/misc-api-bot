import dotenv from "dotenv";
import { Client } from "discord.js";
import commands from "./commands";

dotenv.config();

const client = new Client();
const PREFIX = "!";

client.on("message", async (message) => {
  if (message.author.bot) return;
  const messageContent = message.content;

  if (messageContent.startsWith(PREFIX)) {
    const [cmd, ...args] = messageContent.substring(1).split(/\s+/);
    const action = commands[cmd];

    if (action) {
      await action(message, args);
    }
  }
});

client.login(process.env.BOT_TOKEN);
