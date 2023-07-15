const dotenv = require("dotenv");
dotenv.config();

const { APP_PORT, DEBUG_MODE, DB_URL, JWT_SECRET_KEY } = process.env;

module.exports = {
  APP_PORT,
  DEBUG_MODE,
  DB_URL,
  JWT_SECRET_KEY,
};
