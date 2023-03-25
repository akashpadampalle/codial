// including required libraries
const express = require('express');
const Router = express.Router();

// including controller
const controller = require('../controllers/controls');

Router.get('/welcome', controller.welcome);



// exporting routes
module.exports = Router;