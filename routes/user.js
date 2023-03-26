// including express
const express = require("express");
const Router = express.Router();

// including controller
const controller = require("../controllers/controls");

Router.post("/create", controller.create);
Router.post("/create-session", controller.createSession);
Router.get("/profile", controller.profile);
Router.get("/signout", controller.signout);
module.exports = Router;
