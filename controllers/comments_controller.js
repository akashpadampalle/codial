const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = async (req, res) => {

    try {
        const post = await Post.findById(req.body.post);

        if (post) {
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            if (comment) {
                post.comments.push(comment);
                post.save();
            }
        }
    } catch (err) {
        console.log(`error in creating comment ${err}`);
    } finally {
        res.redirect('back');
    }
}


module.exports.destroy = async (req, res) => {
    try {

        const comment = await Comment.findById(req.params.id);

        if (comment && comment.user == req.user.id) {
            await Post.findByIdAndUpdate(comment.post, { $pull: { comments: req.params.id } });
            await Comment.findByIdAndDelete(req.params.id);
        }

    } catch (err) {
        console.log(`error accure while destroying comment ${err}`);
    } finally {
        res.redirect('back');
    }

}