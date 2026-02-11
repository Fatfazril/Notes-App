const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    trim: true
    },

    slug: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
    },

    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
    },

    isDeleted: {
    type: Boolean,
    default: false
    }

}, { timestamps: true });

module.exports = mongoose.model("Folder", folderSchema);