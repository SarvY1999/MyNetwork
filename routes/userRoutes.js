const express = require('express');
const router = express.Router();
const {
    register, login, logout, showMe
} = require('../controllers/userController');

const {viewMyProfile, viewOthersProfile} = require('../controllers/userProfileController')
const authentication = require('../middleware/authentication');


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/showMe').get(authentication, showMe);
router.route('/profile').get(authentication, viewMyProfile);
router.route('/profile/:id').get(authentication, viewOthersProfile);

module.exports = router;