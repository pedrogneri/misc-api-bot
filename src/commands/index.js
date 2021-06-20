const poke = require("./poke");
const doggo = require("./doggo");

const commands = {
  [poke.COMMAND]: poke.action,
  [doggo.COMMAND]: doggo.action,
};

module.exports = commands;
