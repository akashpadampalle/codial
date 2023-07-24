const User = require('../models/user');

module.exports.profile = function (req, res) {
    res.end('<h1>User Profile</h1>');
}

// render the signup page
module.exports.signUp = function (req, res) {
    res.render('user_sign_up', { title: "Codial | Sign Up" });
}

// render the singin page
module.exports.signIn = function (req, res) {
    res.render('user_sign_in', { title: "Codial | Sign In" });
}

// get the sign up data
module.exports.create = async function (req, res) {
    try {
        if (req.body.password !== req.body.confirm_password) {
            return res.redirect('back');
        }

        const preUser = await User.findOne({ email: req.body.email })

        if (preUser) {
            return res.redirect('back');
        }

        await User.create(req.body)
        return res.redirect('/users/sign-in');

    } catch (err) {
        console.log(`error in sign up ${err}`);
        res.redirect('back');
    }

}

// sign in and create a session for user
module.exports.createSession = function (req, res) {
    // TODO later
}