const Joi = require("joi");
const bcrypt = require("bcrypt");
const JwtService = require("../../services/JwtService");

const CustomErrorHandler = require("../../services/CustomErrorHandler");
const User = require("../../models");

const loginController = {
  async login(req, res, next) {
    const { email, password } = req.body;
    // validation
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { error } = loginSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    try {
      const user = await User.findOne({ email });
      if (!user) {
        // return next(CustomErrorHandler.wrongCredentials());
        return res.json({ error: "Wrong Credentials" });
      }
      // Compare the password
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.json({ error: "Wrong Credentials" });
      }

      // Token
      access_token = JwtService.sign({
        _id: user._id,
        role: user.role,
      });

      return res.json({ access_token });
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = loginController;
