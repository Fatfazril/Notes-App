const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema ({
    name :{
        type : String,
        required : true
    },
    slug : {
        type : String,
        required : true
    },
    owner : {
        ref : "User",
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },

    //Sharing And Role

    members : [
        {
            user : {
                ref : "User", 
                type : mongoose.Schema.Types.ObjectId,
            },
            role : {
                type : String,
                enum : ["owner", "editor", "viewer"],
                default : "viewer"
            }
        }
    ]


}, {timestamps : true})

module.exports = mongoose.model("Folder", folderSchema);