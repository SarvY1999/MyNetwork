const express = require('express')
const router = express.Router();
const {likePost, showLikesOnPosts} = require('../controllers/likeController');
const authentication = require('../middleware/authentication');

router.route('/:id').post(authentication, likePost);
router.route('/showlikes/:id').post(authentication, showLikesOnPosts);

module.exports = router;