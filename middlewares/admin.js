const CustomErrorHandler = require("../services/CustomErrorHandler");
const JwtService = require("../services/JwtService");
const { JWT_REFRESH_SECRET } = require("../config");
const { User } = require("../models");

const admin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.user._id,
    });
    console.log("logged in user ", user);
    if (user.role === "admin") {
      next();
    } else {
      // return next(CustomErrorHandler.unAuthorized())
      return next({ error: "Not authorized!" });
    }
  } catch (err) {
    // return next(CustomErrorHandler.serverError());
    return next({ error: "Server error" });
  }
};

module.exports = admin;
