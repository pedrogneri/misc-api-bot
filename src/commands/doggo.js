const axios = require("axios");
const { MessageEmbed } = require("discord.js");

const COMMAND = "doggo";

const getDogImage = async () => {
  const { data } = await axios.get(
    "https://api.thedogapi.com/v1/images/search"
  );

  return data[0].url;
};

const action = async () => {
  const embed = new MessageEmbed();

  try {
    const doggo = await getDogImage();
    const title = ":dog: ".repeat(5);

    embed.setTitle(title);
    embed.setImage(doggo);
  } catch (e) {
    embed.setTitle(`Failed :(`);
    embed.setDescription(`Something goes wrong during doggo search`);
    embed.setColor("RED");
  }

  return embed;
};

module.exports = { COMMAND, action };
