const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    
    user : {
        ref : "User", 
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    folder : {
        ref : "Folder", 
        type : mongoose.Schema.Types.ObjectId,
    },
    title : {
        type: String,
        required: true
    },
    content : {
        type: String,
        required: true
    }, 

    //Feature

    isFavorite : {
        type : Boolean,
        default : false
    },

    isDeleted : {
        type : Boolean,
        default : false
    },

    deletedAt : {
        type : Date,
        default : null
    },
    
}, { timestamps: true })

module.exports = mongoose.model('Note', noteSchema);