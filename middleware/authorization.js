const { StatusCodes } = require("http-status-codes");
const CustomError = require("../customError/customError");


const authorization = async (req, res, next) => {
    try{
        if(req.user.role === "admin"){
            next();
        }
    }catch(error){
        throw new CustomError('Not an Admin user', StatusCodes.FORBIDDEN);
    }
}

module.exports = authorization;