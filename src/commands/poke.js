const axios = require("axios");
const { MessageEmbed } = require("discord.js");
const Vibrant = require("node-vibrant");

const getColorHex = (rgb) => {
  let color = "#";

  rgb.map((code) => {
    const rgb = Math.round(code);
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }

    color += hex;
  });

  return color;
};

const searchById = async (args) => {
  // if (!Number(args)) args.toLowerCase();

  const { data: pokemon } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${args}`
  );

  const embed = new MessageEmbed();
  embed.setTitle(`#${pokemon.id} - ${pokemon.name}`);
  embed.setImage(pokemon.sprites.front_default);

  const palette = await Vibrant.from(
    pokemon.sprites.front_default
  ).getPalette();

  const color = getColorHex(palette.LightVibrant.rgb);
  embed.setColor(color);

  return embed;
};

module.exports = { searchById };
