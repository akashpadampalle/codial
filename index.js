const express = require('express');
const db = require('./configs/db_connection');
const layout = require('express-ejs-layouts');
const path = require('path')
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'assets')));

// setting up ejs
app.use(layout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');


app.use('/', require('./routers/index'));

app.listen(PORT, (err) => {
    if(err){
       console.log(`error while starting server ${err}`); 
       return;
    }

    console.log(`server is running at ${PORT}`);
})