const { StatusCodes } = require("http-status-codes");
const CustomError = require("../customError/customError");

const checkPermission = (requser, resourceId) => {
    if (requser.role === "admin" || requser.userId === resourceId.toString()) {
        return true;
    } else {
        throw new CustomError('You do not have permission to perform this action', StatusCodes.FORBIDDEN);
    }
}

module.exports = checkPermission;