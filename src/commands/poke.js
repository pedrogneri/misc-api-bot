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

const getCapitalizedName = (name) => {
  const [first, ...rest] = name.split("");
  const upper = first.toUpperCase();

  return upper + rest.join("");
};

const getPredominantColor = async (image) => {
  try {
    const palette = await Vibrant.from(image).getPalette();

    return getColorHex(palette.LightVibrant.rgb);
  } catch (e) {
    return "#fff";
  }
};

const searchById = async (args) => {
  const embed = new MessageEmbed();

  try {
    const pokemon = await getPokemon(args);
    const name = getCapitalizedName(pokemon.name);
    const image = pokemon.sprites.other["official-artwork"].front_default;
    const color = await getPredominantColor(image);

    let description = "";

    embed.setTitle(`${name}`);
    embed.setThumbnail(image);
    embed.setColor(color);

    pokemon.types.map(({ type }) => {
      description += ` \`${type.name}\``;
    });

    embed.setDescription(description);
    embed.setFooter(`Nº ${pokemon.id}`);
  } catch (e) {
    embed.setTitle(`Failed :(`);
    embed.setDescription(`No pokemon find for query "${args.join(" ")}"`);
    embed.setColor("RED");
  }

  return embed;
};

module.exports = { searchById };
