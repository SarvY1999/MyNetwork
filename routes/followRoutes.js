const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication')
const {
    follow, unFollow, getMyFollowers, getMyFollowing
} = require('../controllers/followController');

router.route('/followers').get(authentication, getMyFollowers);
router.route('/following').get(authentication, getMyFollowing);
router.route('/:id').post(authentication, follow).delete(authentication, unFollow);

module.exports = router;