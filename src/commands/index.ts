import poke from "./poke";
import doggo from "./doggo";

const commands = {
  [poke.COMMAND]: poke.action,
  [doggo.COMMAND]: doggo.action,
};

export default commands;
