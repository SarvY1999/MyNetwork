const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../customError/customError');

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
module.exports = {viewMyProfile, viewOthersProfile};