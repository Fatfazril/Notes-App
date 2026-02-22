const jwt = require('jsonwebtoken');

const generateToken = (id , expires = '15m') => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: expires,
    });
}

module.exports = generateToken;