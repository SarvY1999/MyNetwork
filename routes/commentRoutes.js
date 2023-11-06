const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication')
const {createComment, editComment, deleteComment} = require('../controllers/commentController');

router.route('/:id').post(authentication, createComment).patch(authentication, editComment).delete(authentication, deleteComment);

module.exports = router;