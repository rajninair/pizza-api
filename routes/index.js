const express = require("express");
const routes = express();

const registerController = require("../controllers/auth/registerController");
const loginController = require("../controllers/auth/loginController");
const userController = require("../controllers/auth/userController");
const refreshController = require("../controllers/auth/refreshController");
const productController = require("../controllers/productController");
const auth = require("../middlewares/auth");

// Auth
routes.post("/register", registerController.register);
routes.post("/login", loginController.login);
routes.get("/me", auth, userController.me);
routes.post("/refresh", refreshController.refresh);
routes.post("/logout", auth, loginController.logout);

// Products
routes.post("/products", auth, productController.store);
routes.put("/products/:id", productController.update);

module.exports = routes;
