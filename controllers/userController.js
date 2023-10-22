const User = require('../models/User');
const CustomError = require('../customError/customError');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new CustomError('Please provide all the details', StatusCodes.BAD_REQUEST);
    };

    const ifExist = await User.findOne({ email: email });

    if (ifExist) {
        throw new CustomError('User already exist', StatusCodes.BAD_REQUEST);
    };

    const user = await User.create({ username, email, password });

    res.status(StatusCodes.CREATED).json({ msg: "User is successfully created", user: user });

};

const login = (req, res) => {
    res.send('login User');
}
const logout = (req, res) => {
    res.send('logout User');
}

module.exports = {
    register, login, logout
}