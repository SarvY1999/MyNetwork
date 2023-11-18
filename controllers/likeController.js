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
};

const unlikePost = async(req, res) => {
    const postId = req.params.id;
    const post = await Post.findOne({_id: postId});

    if(!post){
        throw new CustomError('Post does not exist', StatusCodes.NOT_FOUND);
    };

    const like = await Like.findOne({post: post._id, user: req.user.userId});

    if(!like){
        throw new CustomError('Unable to unlike the post', StatusCodes.BAD_REQUEST);
    };

    await Like.deleteOne({post: post._id, user: req.user.userId});
    res.status(StatusCodes.OK).json('You Unliked this post');
};


module.exports = {likePost, showLikesOnPosts, unlikePost};