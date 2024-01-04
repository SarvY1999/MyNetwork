const { StatusCodes } = require("http-status-codes")
const CustomError = require("../customError/customError")
const path = require('path')

const checkAndMovePostImage = async (img) => {
    if (!img.mimetype.startsWith('image')) {
        throw new CustomError('Please select an image', StatusCodes.BAD_REQUEST);
    }
    const maxsize = 1024 ** 5;

    if (img.size > maxsize) {
        throw new CustomError('Image is too big, please select an image smaller than 5 MB ', StatusCodes.BAD_REQUEST);
    }

    const imgPath = path.join(__dirname, `../public/postImg/` + `${Date.now()}${img.name}`);
    await img.mv(imgPath)
    return imgPath;
}

module.exports = checkAndMovePostImage;