const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");

class JwtService {
  static sign(payload, expiry = "60s", secret = JWT_SECRET_KEY) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }
}

module.exports = JwtService;
