const Discord = require("discord.js");
const client = new Discord.Client();
const charName = require("./dataframe/charname.js");

const botToken = process.env["bot_token"];
const dataFrame = require("./takeDataFrame");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  if (msg.content[0] === "!") {
    // Correct Command: !.n.anji.5p
    //                  !.s.anji.214p
    command = msg.content;

    if (command.length < 3) {
      msg.replay("Check You Command Correction");
    } else if (command === "!ping") {
      msg.reply("Pong! I'm Here");
    } else if (command === "!help") {
      // ***
      //  Help Command
      msg.reply(
        "```fix\nCommand: !.<s/n>.<char_name>.<move>\n  n means Normal Move || s means Special Move\n \nWarning: Don't use dot(.) in jump | close | far --> j.S -> jS | c.S => cS | f.S => fS\nExmaple: Character: Anji, Move: 2p --> !.n.anji.2p \n    Character: Anji, Move: 236P --> !.s.anji.236P\nType: !char for Character's Name List \nContact AnjiBoss#6791 for Bot issue```"
      );
    } else if (command === "!char") {
      // ***
      //  Character Name List
      msg.reply(charName);
    } else if (command[1] === ".") {
      // Check Type Of Move
      if (command[2] === "n") {
        // [!, s|n, <char_name>, <move>]
        const arrCommand = command.split(".");

        dataFrame(
          `dataframe/${arrCommand[2]}_normal_df.csv`,
          arrCommand[3],
          (data) => {
            msg.reply(data);
          }
        );
      } else if (command[2] === "s") {
        const arrCommand = command.split(".");
        dataFrame(
          `dataframe/${arrCommand[2]}_special_df.csv`,
          arrCommand[3],
          (data) => {
            msg.reply(data);
          }
        );
      } else {
        msg.reply("Check You Command Correction");
      }
    }
  }
});

client.login(botToken);
