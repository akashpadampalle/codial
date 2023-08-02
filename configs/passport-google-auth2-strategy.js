const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');


passport.use(
    new GoogleStrategy(
        {
            clientID: "120408277211-2kccfrqqjo2jqf5h7bk0763viab1v40j.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:8000/users/auth/google/callback"
        },

        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await User.findOne({ email: profile.emails[0].value });
                if(user){ return done(null, user) }
                    
                const newUser = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                    avatar: profile.photos[0]?.value
                });

                return done(null, newUser);
                

            } catch (error) {
                console.log('***** error google Authentication', error);
                return done(error);
            }
        }
    )
);



module.exports = passport;
