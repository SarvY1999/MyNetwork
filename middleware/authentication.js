const { StatusCodes } = require('http-status-codes');
const CustomError = require('../customError/customError');
const verifyToken = require('../utils/verifyToken');

const authentication = (req, res, next) => {

    const token = req.signedCookies.token;

    if(!token){
        throw new CustomError('Please Login or Signup', StatusCodes.BAD_REQUEST);
    }

    try{
    const isValid = verifyToken(token);
    req.user = isValid;
    next();

    }catch(error){
        throw new CustomError('Authentication Invalid', StatusCodes.FORBIDDEN);
    }
}


module.exports = authentication;