const User = require('../models/Users');
const generateToken = require('../utils/token');
const validateUserSchema = require('../../validation/Users');

// Register User
module.exports.registerUser = async (req , res) => {
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

        return res.json({
            success: true,
            message: 'Login successful',
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