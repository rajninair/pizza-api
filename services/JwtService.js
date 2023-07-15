const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");

class JwtService {
  static sign(payload, expiry = "120s", secret = JWT_SECRET_KEY) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }

  static verify(token, secret = JWT_SECRET_KEY) {
    console.log("jwtservice - token", token);
    console.log("jwt.verify(token, secret)", jwt.verify(token, secret));
    return jwt.verify(token, secret);
  }
}

module.exports = JwtService;
