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

const getPokemon = async (parameter) => {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${parameter}`
  );

  return data;
};

const searchById = async (args) => {
  const embed = new MessageEmbed();

  try {
    const pokemon = await getPokemon(args);

    embed.setTitle(`#${pokemon.id} - ${pokemon.name}`);
    embed.setImage(pokemon.sprites.front_default);

    const palette = await Vibrant.from(
      pokemon.sprites.front_default
    ).getPalette();

    const color = getColorHex(palette.LightVibrant.rgb);
    embed.setColor(color);
  } catch (e) {
    embed.setTitle(`Failed :(`);
    embed.setDescription(`No pokemon find for query ${args}`);
    embed.setColor("RED");
  }

  return embed;
};

module.exports = { searchById };
