const mongoose = require("mongoose");
const refreshTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

const RefreshToken = mongoose.model(
  "RefreshToken",
  refreshTokenSchema,
  "refreshTokens"
);
module.exports = RefreshToken;
