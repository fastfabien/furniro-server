const db = require("../models/index.js");

const connectDb = () =>
  db.mongoose
    .connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connect to MongoDB.");
    })
    .catch((err) => {
      console.error("Connection error", err);
      process.exit();
    });

module.exports = { connectDb };
