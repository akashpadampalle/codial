const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async function (email, password, done) {
    try {
        // find the user and establish the identity
        const user = await User.findOne({ email: email });
        if (!user || user.password !== password) {
            return done(null, false)
        }

        user.password = undefined;
        return done(null, user);

    } catch (err) {
        console.log(`error passport authentication ${err}`);
        return done(err);
    }
}));

// serializing user to decide which key is to kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});


// deserializing the user from the key in the cookies
passport.deserializeUser( async function(id, done){
    const user = await User.findById(id);

    if(!user){
        return done(null, false);
    }

    return done(null, user);
})


// check if user in authenticated
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    // if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user 
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;