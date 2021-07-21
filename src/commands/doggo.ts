import axios from "axios";
import { Message, MessageEmbed } from "discord.js";
import APIS_URL from "../apis";

const COMMAND = "doggo";
const URL = APIS_URL.theDogAPI;

type TheDogAPIResponse = {
  url: string;
}

const getDogImage = async () => {
  const { data } = await axios.get<TheDogAPIResponse[]>(URL);

  return data[0].url;
};

const action = async (message: Message) => {
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

export default { COMMAND, action };
