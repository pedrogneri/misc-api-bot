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

const searchById = async (args) => {
  const embed = new MessageEmbed();

  try {
    const pokemon = await getPokemon(args);
    const name = getCapitalizedName(pokemon.name);
    let description = "";

    embed.setTitle(`Nº ${pokemon.id}\n${name}`);
    embed.setImage(pokemon.sprites.other["official-artwork"].front_default);

    pokemon.types.map(({ type }) => {
      description += ` \`${type.name}\``;
    });

    embed.setDescription(description);

    const palette = await Vibrant.from(
      pokemon.sprites.front_default
    ).getPalette();

    const color = getColorHex(palette.LightVibrant.rgb);
    embed.setColor(color);
  } catch (e) {
    embed.setTitle(`Failed :(`);
    embed.setDescription(`No pokemon find for query "${args.join(" ")}"`);
    embed.setColor("RED");
  }

  return embed;
};

module.exports = { searchById };
