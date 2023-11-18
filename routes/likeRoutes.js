const express = require('express')
const router = express.Router();
const {likePost, showLikesOnPosts, unlikePost} = require('../controllers/likeController');
const authentication = require('../middleware/authentication');

router.route('/:id').post(authentication, likePost).delete(authentication, unlikePost);
router.route('/showlikes/:id').get(authentication, showLikesOnPosts);

module.exports = router;