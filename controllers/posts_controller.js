const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
    try {
        const post = await Post.create({ content: req.body.content, user: req.user._id });
    } catch (err) {
        console.log(`error in create post ${err}`);
    }finally{
        res.redirect('back');
    }
}


module.exports.destroy = async function(req, res){
    try{
        const post = await Post.findById(req.params.id);
        if(post && post.user == req.user.id){
            await Post.findByIdAndDelete(post.id);
            await Comment.deleteMany({post: req.params.id})
        }
    }catch(err){
        console.log(`error in destroying post ${err}`);
    }finally{
        res.redirect('back');
    }
}