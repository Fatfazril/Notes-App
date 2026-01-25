const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwti.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

module.exports = generateToken;