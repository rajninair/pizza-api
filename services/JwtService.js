const jwt = require("jsonwebtoken");
const { JWT_ACCESS_SECRET } = require("../config");

class JwtService {
  static sign(payload, expiry = "1y", secret = JWT_ACCESS_SECRET) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }

  static verify(token, secret = JWT_ACCESS_SECRET) {
    console.log("token ", token);
    console.log("secret ", secret);
    return jwt.verify(token, secret);
  }
}

module.exports = JwtService;
