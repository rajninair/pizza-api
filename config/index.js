const dotenv = require("dotenv");
dotenv.config();

const {
  APP_PORT,
  DEBUG_MODE,
  DB_URL,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  APP_URL,
} = process.env;

module.exports = {
  APP_PORT,
  DEBUG_MODE,
  DB_URL,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  APP_URL,
};
