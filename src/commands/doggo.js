const axios = require("axios");
const { MessageEmbed } = require("discord.js");
const APIS_URL = require("../apis");

const COMMAND = "doggo";
const URL = APIS_URL.theDogAPI;

const getDogImage = async () => {
  const { data } = await axios.get(URL);

  return data[0].url;
};

const action = async (message) => {
  const embed = new MessageEmbed();

  try {
    const doggo = await getDogImage();
    const dogEmoji = ":dog:";
    const title = Array(5).fill(dogEmoji).join(" @ ");

    embed.setTitle(title);
    embed.setImage(doggo);
  } catch (e) {
    embed.setTitle(`Failed :(`);
    embed.setDescription(`Something goes wrong during doggo search`);
    embed.setColor("RED");
  }

  message.channel.send(embed);
};

module.exports = { COMMAND, action };
