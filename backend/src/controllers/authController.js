const User = require('../models/Users');
const generateToken = require('../utils/token');
const redisClient = require('../config/redis');

// Register User
module.exports.register = async (req , res) => {
    try {
        const {email , username , password} = req.body;

        const exist = await User.findOne({email});
        if(exist) {
            return res.status(409).json({
                success: false,
                message: 'User already exists'
            })
        }
        const user = await User.create({email , username , password});

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                _id: user._id,
                email: user.email,
                username: user.username,
            },
            token: generateToken(user._id)
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server error'
        });
    }
}

// Login User
module.exports.login = async (req , res) => {
    try {
        const { email , password} = req.body;

        const user = await User.findOne({email}).select("+password");
        if(!user) {
            return res.status(401).json({
                success: false,
                message : 'Invalid Credentials'
            })
        }

        const isMatch = await user.matchPassword(password);
        if(!isMatch) {
            return res.status(401).json({
                success: false,
                message : 'Invalid Credentials'
            })
        }

        const accessToken = generateToken(user._id);
        const refreshToken = generateToken(user._id, '7d');

        await redisClient.set(`refreshToken:${user._id}`, refreshToken, 'EX', 7 * 24 * 60 * 60);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite : "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({
            success: true,
            message: 'Login successful',
            data: {
                _id: user._id,
                email: user.email,
                username: user.username,
            },
            accessToken
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server error'
        });
    }
}

module.exports.logout = async (req, res) => {
    const token = req.cookies.refreshToken;

    if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await redisClient.del(`refreshToken:${decoded.id}`);
    } 

    res.clearCookie('refreshToken', {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
    });

    return res.json({ message: 'Logged out successfully' });
};

module.exports.refreshToken = async (req , res) => {
    try {
        const token = req.cookies.refreshToken;

        if(!token) {
            return res.status(401).json({
                success: false,
                message: 'No refresh token'
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const storedToken = await redisClient.get(`refreshToken:${decoded.id}`);

        if(!storedToken || storedToken !== token) {
            return res.status(403).json({
                success: false,
                message: 'Invalid refresh token'
            })
        }

        const newAccessToken = generateToken(decoded.id, '15m');

        return res.json({
            success: true,
            message: 'Refresh token successful',
            accessToken: newAccessToken
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server error'
        });
    }
}