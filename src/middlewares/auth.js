const User = require("../models/Users");

module.exports = async (req, res, next) => {
    if(!req.session.userId) {
        return res.status(401).json({
            success: false,
            message: 'Session Expired. Please login again.'
        })
    }

    const authHeader = req.headers.authorization;
    if(!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized'
        })
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized'
        })
    }
}
    