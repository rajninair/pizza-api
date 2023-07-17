const express = require("express");
const routes = express();

const registerController = require("../controllers/auth/registerController");
const loginController = require("../controllers/auth/loginController");
const userController = require("../controllers/auth/userController");
const refreshController = require("../controllers/auth/refreshController");
const productController = require("../controllers/productController");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

// Auth
routes.post("/register", registerController.register);
routes.post("/login", loginController.login);
routes.post("/refresh", refreshController.refresh);
routes.post("/logout", auth, loginController.logout);
routes.get("/me", auth, userController.me);

// Products
routes.post("/products", [auth, admin], productController.store);
routes.put("/products/:id", [auth, admin], productController.update);

module.exports = routes;
