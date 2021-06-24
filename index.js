const express = require("express");
const app = express();
const bot = require("./bot.js")

const PORT = process.env.PORT || 5000;

bot;

app.get("/", (req, res) => {
  res.send("You are On Home");
});

const server = app.listen(PORT, () => console.log("Running on " + PORT));
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(process.exit(1));
});
