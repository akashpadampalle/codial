const Post = require("../models/post");
const User = require("../models/user");


module.exports.home = async (req, res) => {

    try {

        const posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });

        const users = await User.find({}).select('-password');

        return res.render('home', {
            title: "Codial | Home",
            posts: posts,
            all_users: users
        });

    } catch (err) {
        console.log(`error in home ${err}`);
        return res.redirect('back')
    }
}