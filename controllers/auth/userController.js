const { User } = require("../../models");
const CustomErrorHandler = require("../../services/CustomErrorHandler");

const userController = {
  async me(req, res, next) {
    try {
      console.log("req.user ?", req.user);

      const user = await User.findOne({ _id: req.user._id }).select(
        "-password -createdAt -updatedAt -__v "
      );
      console.log("found user ?", user);
      if (!user) {
        // return next(CustomErrorHandler.notFound());
        return res.json({ error: "User not found" });
      }
      res.json(user);
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = userController;
