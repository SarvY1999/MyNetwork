const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../customError/customError');

const viewMyProfile = async (req, res) => {
    const userProfile = await User.findOne({_id: req.user.userId}).populate('followers').populate('following').select('-password');
    res.status(StatusCodes.OK).json({userProfile})
};
module.exports = {viewMyProfile};