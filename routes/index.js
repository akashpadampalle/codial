// including required libraries
const express = require("express");
const Router = express.Router();

// including controller
const controller = require("../controllers/controls");

// Router.get("/login-form", controller.loginForm);
// Router.get("/signup-form", controller.signupForm);
// form routes
Router.use("/form", require("./form"));

//user routes
Router.use("/user", require("./user"));

// exporting routes
module.exports = Router;
