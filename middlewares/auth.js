const CustomErrorHandler = require("../services/CustomErrorHandler");
const JwtService = require("../services/JwtService");

const auth = async (req, res, next) => {
  let authHeader = req.headers.authorization;
  console.log("authHeader", authHeader);
  if (!authHeader) {
    // return next(CustomErrorHandler.unAuthorized());
    return next("unAuthorized");
  }

  const token = authHeader.split(" ")[1];
  console.log("auth.js token", token);

  try {
    const { _id, role } = await JwtService.verify(token);
    console.log("_id", _id);
    console.log("role", role);

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
