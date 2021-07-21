import axios from "axios";
import { MessageEmbed, Message } from "discord.js";
import Vibrant from "node-vibrant";
import APIS_URL from "../apis";

const COMMAND = "poke";
const URL = APIS_URL.pokeAPI;

type PokeAPIResponse = {
  id: number,
  name: string,
  types: {
    type: {
      name: string,
    },
  }[],
  sprites: {
    other: {
      "official-artwork": {
        front_default: string,
      }
    }
  }
}

const getColorHex = (rgb: number[]) => {
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

const getPokemon = async (parameter: string): Promise<PokeAPIResponse> => {
  const { data } = await axios.get(`${URL}/${parameter}`);

  return data;
};

const getCapitalizedName = (name: string) => {
  const [first, ...rest] = name.split("");
  const upper = first.toUpperCase();

  return upper + rest.join("");
};

const getPredominantColor = async (image: string) => {
  try {
    const palette = await Vibrant.from(image).getPalette();

    return getColorHex(palette.LightVibrant.rgb);
  } catch (e) {
    return "#fff";
  }
};

const action = async (message: Message, args: string[]) => {
  const embed = new MessageEmbed();

  try {
    const pokemon = await getPokemon(args[0]);
    const name = getCapitalizedName(pokemon.name);
    const image = pokemon.sprites.other["official-artwork"].front_default;
    const color = await getPredominantColor(image);

    const number = `Nº ${pokemon.id}\n`;

    let description = number;

    embed.setTitle(name);
    embed.setThumbnail(image);
    embed.setColor(color);

    pokemon.types.map(({ type }) => {
      description += ` \`${type.name}\``;
    });

    embed.setDescription(description);
  } catch (e) {
    embed.setTitle(`Failed :(`);
    embed.setDescription(`No pokemon find for query "${args.join(" ")}"`);
    embed.setColor("RED");
  }

  message.channel.send(embed);
};

export default { COMMAND, action };
