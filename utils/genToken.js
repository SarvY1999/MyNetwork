const jwt = require('jsonwebtoken');

const genToken = (res, userData) => {
    const token = jwt.sign(userData, 'secret', {expiresIn: '1d'});
    return res.cookie(
        'token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 86,400,000 Miliseconds in one day 
            signed: true
        }
    ) 

};


module.exports = genToken;