const Comment = require('../models/Comment');
const Post = require('../models/Post');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../customError/customError');
const checkPermission = require('../utils/checkPermission');

const createComment = async (req, res) => {
    
    const postId = req.params.id;
    const { comment } = req.body;
    const post = await Post.findOne({_id: postId});

    if(!post){
        throw new CustomError('Post does not exist', StatusCodes.NOT_FOUND);
    };

    if(!comment){
        throw new CustomError('Empty comments are not allowed', StatusCodes.BAD_REQUEST);
    };

    await Comment.create({comment: comment, user: req.user.userId, post: post._id});
    res.status(StatusCodes.CREATED).json({msg: 'Comment posted successfully'});
};

const editComment = async (req, res) => {
    
    const commentId = req.params.id;
    const {comment} = req.body;
    const dbcomment = await Comment.findOne({_id: commentId}); 

    if(!dbcomment){
        throw new CustomError('Comment does not exist'. StatusCodes.NOT_FOUND);
    }

    if(!comment){
        throw new CustomError('Empty comment is not allowed'. StatusCodes.BAD_REQUEST);
    }

    checkPermission(req.user, dbcomment.user);
    dbcomment.comment = comment;

    await dbcomment.save();
    res.status(StatusCodes.CREATED).json({msg: "Comment edited successfully"});
};

// const showCommentsByPost = async(req, res) => {
    
// }

const deleteComment = async (req, res) => {
    const commentId = req.params.id;
    const dbComment = await Comment.findOne({_id: commentId});

    if(!dbComment){
        throw new CustomError('Comment does not exist', StatusCodes.NOT_FOUND);
    }

    checkPermission(req.user, dbComment.user);

    await dbComment.deleteOne({_id: commentId});
    res.status(StatusCodes.OK).json({msg: "Comment deleted successfully"});
};


module.exports = {
    createComment, editComment, deleteComment
};