const bcrypt = require('bcrypt');
const CustomError = require('../customError/customError');
const { StatusCodes } = require('http-status-codes');

const comparePassword = async (password, hashedPassword) => {
    console.log("passoword provided by user: ", password);
    console.log("passoword provided by db: ", hashedPassword);
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
        throw new CustomError('Invalid Credentials', StatusCodes.UNAUTHORIZED);
    }
}

module.exports = comparePassword;