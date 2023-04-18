const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/codial');
const db = mongoose.connection;

// if there any error print
db.on('error', console.error.bind(console, "error while connecting to db :: MongoDB"));

// once the connection is open
db.once('open', ()=>{
    console.log('connection successfull :: MongoDB');
})


module.exports = db;