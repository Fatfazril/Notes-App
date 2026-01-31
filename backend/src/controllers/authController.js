const User = require('../models/Users');
const generateToken = require('../utils/token');

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
module.exports.Login = async (req , res) => {
    try {
        const { email , password} = req.body;

        const user = await User.findOne({email});
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

        req.session.userId = user._id;

        const accessToken = generateToken(user._id);
        const refreshToken = generateToken(user._id, '7d');

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
    try {
        const userId = req.user?.id;

        // 1. Delete refresh token from Redis
        if (userId) {
            await redisClient.del(`refreshToken:${userId}`);
        }

        // 2. Destroy session
        req.session.destroy(() => {
            // 3. Clear refresh token cookie
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });

            return res.json({
                success: true,
                message: "Logged out successfully"
            });
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to logout"
        });
    }
};

