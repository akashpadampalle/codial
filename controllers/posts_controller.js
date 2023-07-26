const Post = require('../models/post');

module.exports.create = async function (req, res) {
    try {
        const post = await Post.create({ content: req.body.content, user: req.user._id });
        res.redirect('back');
    } catch (err) {
        console.log(`error in create post ${err}`);
        res.redirect('back');
    }
}