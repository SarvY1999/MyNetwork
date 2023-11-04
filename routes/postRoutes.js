const {
    createPost,
    getsinglePost,
    getAllPost,
    editPost,
    deletePost
} = require('../controllers/postController');
const authentication = require('../middleware/authentication');
const express = require('express');
const router = express.Router();


router.route('/').get(authentication, getAllPost).post(authentication, createPost);
router.route('/:id').get(authentication, getsinglePost).patch(authentication, editPost).delete(authentication, deletePost);

module.exports = router;