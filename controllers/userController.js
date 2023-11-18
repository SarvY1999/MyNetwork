const User = require('../models/User');
const CustomError = require('../customError/customError');
const { StatusCodes } = require('http-status-codes');
const comparePassword = require('../utils/comparePassword');
const genToken = require('../utils/genToken');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new CustomError('Please provide all the details', StatusCodes.BAD_REQUEST);
    };
    // Bug: What if user enters an username which already exists.
    const ifExist = await User.findOne({ email: email });

    if (ifExist) {
        throw new CustomError('User already exist', StatusCodes.BAD_REQUEST);
    };

    const user = await User.create({ username, email, password });

    res.status(StatusCodes.CREATED).json({ msg: "User is successfully created", user: user });

};

const login = async (req, res) => {
    const { email, password } = req.body;
    // verify if email and password is provided or not
    if (!email || !password) {
        throw new CustomError(`Please provide valid email and password`, StatusCodes.BAD_REQUEST);
    }

    const user = await User.findOne({ email: email });

    //verify if user Exist or not
    if (!user) {
        throw new CustomError(`No user found with email ${email}, Please register`, StatusCodes.BAD_REQUEST);
    }

    // verify password
    await comparePassword(password, user.password);

    const userObj = {
        email : user.email,
        username : user.username,
        userId: user._id,
        role: user.role
    }

    // generating Token and cookie
    const token = genToken(res, userObj);
    // console.log('Unsigned: ', req.cookies);
    // console.log('signed', req.signedCookies);
    res.status(StatusCodes.OK).json({ msg: `Welcome User ${user.username}`});
};

const logout = ({req, res, msg}) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({msg: msg || 'Logged out successfully..!'});
}

const showMe = (req, res) => {
    res.status(StatusCodes.OK).json({user: req.user.username}); 
}

module.exports = {
    register, login, logout, showMe
}