const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../customError/customError');
const comparePassword = require('../utils/comparePassword');
const {logout} = require('../controllers/userController');
const path = require('path');
const checkPermission = require('../utils/checkPermission');

const viewMyProfile = async (req, res) => {
    const userProfile = await User.findOne({_id: req.user.userId}).populate('followers').populate('following').select('-password');
    res.status(StatusCodes.OK).json({userProfile})
};

const viewOthersProfile = async(req, res) => {
    const userId = req.params.id;

    const user = await User.findOne({_id: userId}).populate('followers').populate('following').select('-password');
    if(!user){
        throw new CustomError('User does not Exists', StatusCodes.BAD_REQUEST);
    };

    res.status(StatusCodes.OK).json({user})

}

const updatePassword = async (req, res) => {
    const {userId} = req.user;
    const {oldPassword, newPassword} = req.body;
    
    if(!oldPassword || !newPassword){
        throw new CustomError('Empty values are not allowed', StatusCodes.BAD_REQUEST);
    };

    const user = await User.findOne({_id: userId});
    await comparePassword(oldPassword, user.password);

    user.password = newPassword;

    await user.save();

    logout({req, res, msg: 'Password Successfully Updated, Please login again'});
}

const uploadProfile = async (req, res) => {
    if(!req.files){
        throw new CustomError('Please select an image as a profile picture', StatusCodes.BAD_REQUEST);
    }
    const profilepic = req.files.image;

    if(!profilepic.mimetype.startsWith('image')){
        throw new CustomError('Please select an image as a profile picture', StatusCodes.BAD_REQUEST);
    }
    const maxsize = 1024 *1024;

    if(profilepic.size > maxsize){
        throw new CustomError('Image is too big, please select an image smaller than 1MB ', StatusCodes.BAD_REQUEST);
    }

    //Get the user 
    const user = await User.findOne({_id: req.user.userId});
    
    //check if the user can update only it's own profile and not other users
    checkPermission(req.user, user._id);

    const imagePath = path.join(__dirname, '../public/profile/'+ profilepic.name);
    await profilepic.mv(imagePath)

    user.profilePicture = imagePath
    await user.save();

    res.status(StatusCodes.OK).json({msg: 'Profile Picture successfully uploaded'});
}
module.exports = {viewMyProfile, viewOthersProfile, updatePassword, uploadProfile};