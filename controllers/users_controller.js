const User = require('../models/user');

module.exports.profile = async function (req, res) {
    try {
        if (req.cookies.user_id) {
            const user = await User.findById(req.cookies.user_id);
            if (user) { return res.render('user_profile', { title: 'User Profile', user: user }) }
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('/users/sign-in');
        }
    } catch (err) {
        console.log(`error in profile controller ${err}`);
        return res.redirect('back');
    }
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
module.exports.createSession = async function (req, res) {
    try {
        // find the user
        const user = await User.findOne({ email: req.body.email });

        //handle user not found
        // handle password which don't match
        if (!user || user.password !== req.body.password) {
            return res.redirect('back');
        }


        // handle session creation
        res.cookie('user_id', user.id);
        return res.redirect('/users/profile')

    } catch (err) {
        console.log(`error in create session ${err}`);
        res.redirect('back');
    }
}