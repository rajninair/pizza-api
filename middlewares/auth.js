const CustomErrorHandler = require("../services/CustomErrorHandler");
const JwtService = require("../services/JwtService");
const { JWT_REFRESH_SECRET } = require("../config");

const auth = async (req, res, next) => {
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    // return next(CustomErrorHandler.unAuthorized());
    return next("unAuthorized");
  }

  const token = authHeader.split(" ")[1];

  try {
    const { _id, role } = await JwtService.verify(token);

    const user = {
      _id,
      role,
    };
    req.user = user;
    next();
  } catch (error) {
    console.log("Unauthorised error", error);
  }
};

module.exports = auth;
