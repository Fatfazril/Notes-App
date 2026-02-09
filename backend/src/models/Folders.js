const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema ({
    name :{
        type : String,
        required : true
    },
    user : {
        ref : "User",
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
}, {timestamps : true})

module.exports = mongoose.model("Folder", folderSchema);