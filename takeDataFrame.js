const csv = require("csv-parser");
const fs = require("fs");
const createDataTable = require("./createDataTable");

// Clear the . in the jump move
const formatMove = (move) => {
  return move.replace(".", "");
};
function capitalize(word) {
  return (
    word.slice(0, word.length - 1) + word.charAt(word.length - 1).toUpperCase()
  );
}

const dataFrame = (fileName, charInput, cb) => {
  const results = [];

  fs.createReadStream(fileName)
    .on("error", (error) => {
      // Handle The Character' name Error
      cb(
        "```diff\n-Check The Character Name Correction Please!\n Type !help for Command Instruction\n !char for Character Name\n```"
      );
    })
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      let data = null;
      results.forEach((move) => {
        if (move.input !== undefined) {
          if (formatMove(move.input) === capitalize(charInput)) {
            data = move;
          }
        }
      });
      if (data === null) {
        // No Move
        return cb(
          "```diff\n-Character: " +
            fileName.split("_")[0].split("/")[1] +
            " Don't Have That Move!```"
        );
      } else {
        // console.log("outter", data)
        const dataTable = createDataTable(
          data,
          fileName.split("_")[0].split("/")[1]
        );
        return cb(dataTable);
      }
    });
};

module.exports = dataFrame;
