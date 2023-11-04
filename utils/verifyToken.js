const jwt = require('jsonwebtoken');


const verifyToken = (token) => {
    const isVerified = jwt.verify(token, process.env.JWT_SECRET);
    return isVerified;
};

module.exports = verifyToken;