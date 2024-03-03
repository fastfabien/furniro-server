const dotenv = require("dotenv");
dotenv.config();

const HOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;
const DB = process.env.DB_NAME;

module.exports = { HOST, PORT, DB };
