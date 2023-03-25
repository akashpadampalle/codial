// including express
const express = require("express");
const Router = express.Router();

// including controller
const controller = require("../controllers/controls");

Router.get("/login", controller.loginForm);
Router.get("/signup", controller.signupForm);

module.exports = Router;
