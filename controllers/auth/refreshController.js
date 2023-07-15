const Joi = require("joi");
const { User, RefreshToken } = require("../../models");
const CustomErrorHandler = require("../../services/CustomErrorHandler");
const JwtService = require("../../services/JwtService");
const { JWT_REFRESH_TOKEN } = require("../../config");

const refreshController = {
  async refresh(req, res, next) {
    // Validate the request

    const refreshSchema = Joi.object({
      refresh_token: Joi.string().required(),
    });
    const { error } = refreshSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    // Check in database
    let refreshtoken;
    let userId;

    try {
      refreshtoken = await RefreshToken.findOne({
        token: req.body.refresh_token,
      });

      if (!refreshtoken) {
        // return next(CustomErrorHandler.unAuthorized("Invalid refresh token"));
        return next(new Err("Invalid refresh token"));
      }
      try {
        const { _id } = await JwtService.verify(
          refreshtoken.token,
          JWT_REFRESH_TOKEN
        );
        userId = _id;
        const user = User.findOne({ _id: userId });
        if (!user) {
          return res.json({ error: "User not found.." });
        }
        // Tokens
        const access_token = JwtService.sign({
          _id: user._id,
          role: user.role,
        });

        const refresh_token = JwtService.sign(
          {
            id: user._id,
            role: user.role,
          },
          "1y",
          JWT_REFRESH_TOKEN
        );
        // Database whitelist
        await RefreshToken.create({
          token: refresh_token,
        });
        res.json({ access_token, refresh_token });
      } catch (err) {
        return next("Invalid refresh token 1");
      }
    } catch (err) {
      return next("Invalid refresh token 2");
    }
  },
};

module.exports = refreshController;
