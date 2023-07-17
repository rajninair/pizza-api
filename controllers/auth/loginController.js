const Joi = require("joi");
const bcrypt = require("bcrypt");
const JwtService = require("../../services/JwtService");

const CustomErrorHandler = require("../../services/CustomErrorHandler");
const { User, RefreshToken } = require("../../models");
const { JWT_REFRESH_SECRET } = require("../../config");

const loginController = {
  async login(req, res, next) {
    console.log(" in login  - req.body", req.body);

    const { email, password } = req.body;

    // validation
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
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
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({ error: "Wrong Credentials" });
      }

      // Token
      const access_token = JwtService.sign({
        _id: user._id,
        role: user.role,
      });

      const refresh_token = JwtService.sign(
        {
          _id: user._id,
          role: user.role,
        },
        "1y",
        JWT_REFRESH_SECRET
      );
      // Database whitelist
      await RefreshToken.create({
        token: refresh_token,
      });
      res.json({ access_token, refresh_token });
    } catch (err) {
      console.log("inside catch block of Login try .. >> ");
      return next(err);
    }
  },
  async logout(req, res, next) {
    const { refresh_token } = req.body;

    // Validation
    const refreshSchema = Joi.object({
      refresh_token: Joi.string().required(),
    });
    const { error } = refreshSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    // Delete refresh token from db
    try {
      await RefreshToken.deleteOne({ token: refresh_token });
    } catch (error) {
      return next(new Error("Something went wrong in the database."));
    }

    res.json({ status: 1 });
  },
};

module.exports = loginController;
