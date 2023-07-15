const dotenv = require("dotenv");
dotenv.config();

const { APP_PORT, DEBUG_MODE, DB_URL, JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } =
  process.env;

module.exports = {
  APP_PORT,
  DEBUG_MODE,
  DB_URL,
  JWT_ACCESS_TOKEN,
  JWT_REFRESH_TOKEN,
};
