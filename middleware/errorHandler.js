const CustomError = require('../customError/customError');
const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.errorCode).json({ msg: err.message });
    }

    if(err.code == 11000){
        return res.status(StatusCodes.OK).json({ msg: 'You have already liked the post' })
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, Please try again" });
}

module.exports = errorHandler;