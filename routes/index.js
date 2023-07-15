const express = require("express");
const routes = express();

const registerController = require("../controllers/auth/registerController");
const loginController = require("../controllers/auth/loginController");
const userController = require("../controllers/auth/userController");
const auth = require("../middlewares/auth");

routes.post("/register", registerController.register);
routes.post("/login", loginController.login);
routes.get("/me", auth, userController.me);

module.exports = routes;
