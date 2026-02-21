const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    username : {
        type : String,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        select : false
    },

    // User Settings
    setting : {
        theme : {
            type : String,
            enum : ['light', 'dark', 'system'],
            default : 'system'
        },
        font : {
            type : String,
            default : 'inter'
        },
        fontSize : {
            type : Number,
            default : 16
        },
        
    },
    
    //Account State
    isActive: {
        type: Boolean,
        default: true
    }
})

//Hash password

userSchema.pre('save' , async function(next) {
    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword , this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;