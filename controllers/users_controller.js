const User = require('../models/user');

module.exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        req.flash('success', `visited profile of ${user.name}`)

        res.render('user_profile', {
            title: 'Codial | Profile',
            profile_user: user
        });

    } catch (err) {
        console.log(`error in users profile ${err}`);
        return res.redirect('back');
    }
}

module.exports.update = async (req, res) =>{
    try {
        await User.findByIdAndUpdate(req.user.id, req.body);
        res.redirect('back');
    } catch (err) {
        console.log(`error while updating user ${err}`);
        res.status(401).send('Unauthorized');
    }
}

// render the signup page
module.exports.signUp = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', { title: "Codial | Sign Up" });
}

// render the singin page
module.exports.signIn =  (req, res) =>{
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    res.render('user_sign_in', { title: "Codial | Sign In" });
}

// get the sign up data
module.exports.create = async (req, res) =>{
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
module.exports.createSession =  (req, res) => {
    req.flash('success', 'logged in successfully');
    return res.redirect('/');
}


module.exports.destroySession = (req, res, next) => {

    req.logout(function(err) {
        req.flash('success', 'you logged out !')
        if (err) { return next(err); }
        res.redirect('/');
      });

}