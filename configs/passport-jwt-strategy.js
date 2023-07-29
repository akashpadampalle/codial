const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codial'
}

passport.use(new JWTStrategy(opts, async (jwtPayload, done) => {

    try {

        const user = await User.findById(jwtPayload._id);

        if(user){ return done(null, user); }
        else{ return done(null, false); }
        

    } catch (err) {

        console.log('***** error in jwt authentication', err);
        return done(err);

    }

}));


module.exports = passport;