const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication')
const {createComment, editComment, deleteComment, showCommentsByPost} = require('../controllers/commentController');

router.route('/:id').post(authentication, createComment).patch(authentication, editComment).delete(authentication, deleteComment).get(authentication, showCommentsByPost);

module.exports = router;