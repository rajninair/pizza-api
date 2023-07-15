const jwt = require("jsonwebtoken");
const { JWT_ACCESS_TOKEN } = require("../config");

class JwtService {
  static sign(payload, expiry = "60s", secret = JWT_ACCESS_TOKEN) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }

  static verify(token, secret = JWT_ACCESS_TOKEN) {
    console.log("jwtservice - token", token);
    console.log("jwt.verify(token, secret)", jwt.verify(token, secret));
    return jwt.verify(token, secret);
  }
}

module.exports = JwtService;
