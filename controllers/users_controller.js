const path = require('path');
const User = require('../models/user');
const fs = require('fs');

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
        let user = await User.findById(req.user.id);
        User.uploadedAvatar(req, res, function(err){
            if(err){console.log('****Multer Error: ', err)}
            user.name = req.body.name;
            user.email = req.body.email;

            

            if(req.file){


                if(user.avatar){
                    try{fs.unlinkSync(path.join(__dirname, '..', user.avatar))}catch(err){
                        /*  explecitly supressing error
                            if there is no file found to delete then we don't have to worry 
                        */
                    }
                }

                // this is the saving path of uploaded file into the avatar field in the user
                user.avatar = User.avatarPath + '/' + req.file.filename
            }

            user.save();

        });
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