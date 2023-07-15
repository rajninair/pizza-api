const express = require("express");
const routes = express();

const registerController = require("../controllers/auth/registerController");
const loginController = require("../controllers/auth/loginController");

routes.post("/register", registerController.register);
routes.post("/login", loginController.login);

module.exports = routes;
