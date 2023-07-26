const Post = require("../models/post");

module.exports.home = async function (req, res) {

    const posts = await Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

    return res.render('home', {
        title: "Codial | Home",
        posts: posts
    });
}