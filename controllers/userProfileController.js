const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../customError/customError');
const comparePassword = require('../utils/comparePassword');
const {logout} = require('../controllers/userController');

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
module.exports = {viewMyProfile, viewOthersProfile, updatePassword};