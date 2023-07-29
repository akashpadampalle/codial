const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

// sign in and create a session for user
module.exports.createSession = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user || user.password != req.body.password) {
            return res.status(422).json({
                message: 'Invalid Username/Password'
            })
        }

        return res.status(200).json({
            message: 'Sign in successful, here is your token, please keet it safe',
            data: {
                token: jwt.sign(user.toJSON(), 'codial', { expiresIn: (10 * 60 * 1000) })
            }
        })
    } catch (err) {
        console.log('**** error in jwt create session', err);
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}