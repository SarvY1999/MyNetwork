const { StatusCodes } = require("http-status-codes")
const CustomError = require("../customError/customError")
const path = require('path')
const crypto = require('crypto');

// work on generating a random string and attach it to the image so that image will be unique evry time
const checkAndMovePostImage = async (img) => {
    if (!img.mimetype.startsWith('image')) {
        throw new CustomError('Please select an image', StatusCodes.BAD_REQUEST);
    }
    const maxsize = 1024 ** 5;

    if (img.size > maxsize) {
        throw new CustomError('Image is too big, please select an image smaller than 5 MB ', StatusCodes.BAD_REQUEST);
    }

    const hash = crypto.createHash('md5').update(img.data).digest('hex');
    const imgPath = path.join(__dirname, `../public/postImg/` + `${hash}${img.name}`);
    await img.mv(imgPath)
    return imgPath;
}

module.exports = checkAndMovePostImage;