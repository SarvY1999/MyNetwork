const Follow = require('../models/Follow');
const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../customError/customError');

const follow = async (req, res) => {
    const userId = req.params.id;

    const user = await User.findOne({_id: userId});
    
    if(!user){
        throw new CustomError('User Does Not Exist', StatusCodes.BAD_REQUEST);
    };

    if(req.user.userId == user._id.toString()){
        throw new CustomError('You cannot follow yourself', StatusCodes.BAD_REQUEST);
    }
    
    const alreadyFollowed = await Follow.findOne({following: userId, follower: req.user.userId});

    if(alreadyFollowed){
        throw new CustomError('You already follow this user', StatusCodes.BAD_REQUEST);
    };

    await Follow.create({following: userId, follower: req.user.userId})

    res.status(StatusCodes.CREATED).json({msg: `You are now following user ${user.username}`})
};


const unFollow = async (req, res) => {
    const userId = req.params.id;
    const user = await User.findOne({_id: userId});
    
    if(!user){
        throw new CustomError('User Does Not Exist', StatusCodes.BAD_REQUEST);
    };
    
    const alreadyFollowed = await Follow.findOne({following: userId, follower: req.user.userId});

    if(!alreadyFollowed){
        throw new CustomError('Sorry, You cannnot unfollow a user that you never followed ', StatusCodes.BAD_REQUEST)
    }
    await Follow.deleteOne({following: userId, follower: req.user.userId})

    res.status(StatusCodes.OK).json({msg: `You unfollowed user ${user.username}`})
};


const getMyFollowers = async (req, res) => {
    const myFollowers = await Follow.find({following: req.user.userId}).populate({path: 'follower', select: 'username'}).select('-following');
    res.status(StatusCodes.OK).json({followers: myFollowers, 'You are followed by': myFollowers.length})
};


const getMyFollowing = async (req, res) => {
    const myFollowing = await Follow.find({follower: req.user.userId}).populate({path: 'following', select: 'username'}).select('-follower');
    res.status(StatusCodes.OK).json({following: myFollowing, 'You are follwing': myFollowing.length})
};


module.exports = {
    follow, unFollow, getMyFollowers, getMyFollowing
};
