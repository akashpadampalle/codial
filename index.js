// including requred modules and libraries
const express = require("express");
require("dotenv").config();
const PORT = process.env.port || 8000;

//including database and model
const db = require("./config/dbconnection");
const User = require("./models/user");

// creating server
const app = express();

// basic utilities for url encoding, decoding
app.use(express.urlencoded());
// using assets folder for static files serves to browser

app.use(express.static("./assets"));

// setting view engine
app.use(require("express-ejs-layouts"));
app.set("view engine", "ejs");
app.set("views", "views");
app.set("layout", "layout");

// setting route
app.use("/", require("./routes/index.js"));

// server is listening any requests
app.listen(PORT, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Server is up and running at port", PORT);
});
