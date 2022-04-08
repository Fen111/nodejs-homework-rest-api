const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.URI_DB;

const db = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.log(`Moongose connection error: ${err}`);
});

mongoose.connection.on("diskonnected", () => {
  console.log("Diskonnected from DB");
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Disconnected from DB");
    process.exit(1);
  });
});

module.exports = db;
