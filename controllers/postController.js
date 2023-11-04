const Post = require('../models/Post');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../customError/customError');
const checkPermission = require('../utils/checkPermission');

const createPost = async(req, res) => {
    const post = req.body;
    if(!post){
        throw new CustomError('Empty posts are not allowed', StatusCodes.BAD_REQUEST);
    }

    post.user = req.user.userId // attaching user to it's created post

    const createdPost = await Post.create(post);

    res.status(StatusCodes.CREATED).json({msg:"Post successfully created", post: await createdPost.populate({path: 'user', select: "username"}) });
};

const getsinglePost = async(req, res) => {
    const postId = req.params.id; 

    const post = await Post.findOne({_id: postId}).populate({path: 'user', select: "username"});

    if(!post){
        throw new CustomError(`No post found with id: ${postId}`);
    }

    res.status(StatusCodes.ACCEPTED).json(post);
};

const getAllPost = async(req, res) => {

    const allPosts = await Post.find({}).populate({path: 'user', select: "username"});

    res.status(StatusCodes.OK).json({allPosts, posts: allPosts.length});
};

const editPost = async(req, res) => {
   const postId = req.params.id;

   const post = await Post.findOne({_id : postId});

   if(!post){
    throw new CustomError(`No post found with id: ${postId}`, StatusCodes.BAD_REQUEST);
   }

   // only the author and admin is allowed to delete the post
   checkPermission(req.user, post.user);

   post.content = req.body.content;

   await post.save();
   res.status(StatusCodes.OK).json({msg: 'Post Successfully Updated'});
};

const deletePost = async(req, res) => {

    const postId = req.params.id;
    const post = await Post.findOne({_id: postId});

    if(!post){
        throw new CustomError(`No post found with id: ${postId}`);
    }

    // only the author and admin is allowed to delete the post

    checkPermission(req.user, post.user);

    await post.deleteOne({_id: postId});

    res.status(StatusCodes.OK).json({msg: 'post Successfully deleted'});
};

module.exports = {
    createPost,
    getsinglePost,
    getAllPost,
    editPost,
    deletePost
}
