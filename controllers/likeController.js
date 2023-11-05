const Like = require('../models/Like');
const Post = require('../models/Post');
const CustomError = require('../customError/customError');
const {StatusCodes} = require('http-status-codes');


const likePost = async(req, res) => {

    const postId = req.params.id;
    const post = await Post.findOne({_id: postId});

    if(!post){
        throw new CustomError('Post does not exist', StatusCodes.NOT_FOUND);
    };

    await Like.create({post: post._id, user: req.user.userId});

    res.status(StatusCodes.OK).json('You liked this post');
};

const showLikesOnPosts = async (req, res) => {
    const postId = req.params.id;

    const post = await Post.findOne({_id: postId});

    if(!post){ 
        throw new CustomError('Post does not exist', StatusCodes.NOT_FOUND);
    }

    const likes = await Like.find({post: postId}).populate({path: 'user', select: 'username'});

    res.status(StatusCodes.OK).json({likes: likes});
}


module.exports = {likePost, showLikesOnPosts};