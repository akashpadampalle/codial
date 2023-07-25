const express = require('express');
const db = require('./configs/db_connection');
const layout = require('express-ejs-layouts');
const path = require('path')
const cookieParser = require('cookie-parser');

// used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./configs/passport-local-strategy');
const MongoStore = require('connect-mongo');

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

// mongo store is used to store session cookie in db
app.use(session({
    name: 'codial',
    // TODO change the secrete before deployment
    secret: 'something something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100) 
    }, 
    /*
    BEFORE VERSION 4
    store: new MongoStore(
        {
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, 
    function (err){
        console.log(err || 'connect-mongodb setup ok')
    })
    */
   
    // NEW WAY TO CONNECT MONGO-STORE
    store: MongoStore.create({
        client: db.getClient(),
        collectionName: 'sessions',
        autoRemove: 'disabled'
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use('/', require('./routers/index'));

app.listen(PORT, (err) => {
    if(err){
       console.log(`error while starting server ${err}`); 
       return;
    }

    console.log(`server is running at ${PORT}`);
})