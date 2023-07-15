const Joi = require("joi");
const User = require("../../models");
const bcrypt = require("bcrypt");
const JwtService = require("../../services/JwtService");
const CustomErrorHandler = require("../../services/CustomErrorHandler");
const registerController = {
  async register(req, res, next) {
    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      repeat_password: Joi.ref("password"),
    });

    const { error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    // Check if user exists already
    try {
      const exist = await User.exists({ email: req.body.email });
      if (exist) {
        // return next(CustomErrorHandler.alreadyExists("Email already exists"));
        // todo - not working
        console.log("Email already exists");
        return res.json({ error: "Email already exists" });
      }
    } catch (err) {
      return next(err);
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    let access_token;

    try {
      const result = await user.save();
      console.log(result);
      // Token
      access_token = JwtService.sign({
        id: result._id,
        role: result.role,
      });
      console.log(access_token);
    } catch (err) {}

    res.json({ access_token: access_token });
  },
};

module.exports = registerController;
