const Joi = require("joi");
const { User, RefreshToken } = require("../../models");
const CustomErrorHandler = require("../../services/CustomErrorHandler");
const JwtService = require("../../services/JwtService");
const { JWT_REFRESH_SECRET } = require("../../config");

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
    let refreshtokenFromDb;
    let userId;

    try {
      refreshtokenFromDb = await RefreshToken.findOne({
        token: req.body.refresh_token,
      });

      if (!refreshtokenFromDb) {
        // return next(CustomErrorHandler.unAuthorized("Invalid refresh token"));
        return next(new Err("Invalid refresh token"));
      }
      try {
        const { _id } = await JwtService.verify(
          refreshtokenFromDb.token,
          JWT_REFRESH_SECRET
        );
        userId = _id;

        const user = await User.findOne({ _id: userId });
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
        return next("Invalid refresh token 1");
      }
    } catch (err) {
      return next("Refresh token not found or db or server error -  2");
    }
  },
};

module.exports = refreshController;
