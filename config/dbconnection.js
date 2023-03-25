// including mongoose library
const mongoose = require('mongoose');

// using dotenv to access mongodb url (envirement variable)
require('dotenv').config();

// connecting to database
mongoose.connect(process.env.db_URL);

// getting connection to variable
const db = mongoose.connection;

// if error accures
db.on('error', console.error.bind(console, 'error connecting to db'));

// if successfully connected to db
db.once('open', () => console.log('database is connected successfully'));

//exporting db connection
module.exports = db;