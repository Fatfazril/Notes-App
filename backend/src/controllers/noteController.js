const AppError = require('../utils/AppError');
const Notes = require('../models/Notes');

// Get all notes
module.exports.getAllNotes = async (req, res, next) => {
    try {
        const note = await Notes.find({
            owner : req.user.id,
            isDeleted : false,
        });

        res.status(200).json({
            status: 'success',
            count : note.length,
            data: note
        });
    } catch (err) {
        next(new AppError('Error fetching notes', 500));
    }
};

// Get note by ID
module.exports.getNoteById = async (req, res, next) => {
    try {
        const note = await Notes.findOne({
            _id : req.params.id,
            owner : req.user.id,
            isDeleted : false
        });

        if(!note) {
            return next(new AppError('Note not found' , 404));
        }
        res.status(200).json({
            status: 'success',
            data: note
        });
    } catch (err) {
        next(new AppError('Error fetching note', 500));
    }
};

// Create new note
module.exports.createNote = async (req , res , next) => {
    try {

        const newNote = await Notes.create({ 
            title : req.body.title, 
            content : req.body.content,
            owner : req.user.id
        });

        res.status(201).json({
            status: 'success',
            data: newNote
        });
    } catch (err) {
        next(new AppError('Error creating note', 500));
    }
};

// Update note
module.exports.updateNote = async (req , res , next) => {
    try {
        const note = await Notes.findOneAndUpdate({
            _id : req.params.id,
            owner : req.user.id 
            },
            req.body,
            { new: true, runValidators: true }
        );

        if(!note) {
            return next(new AppError('Note not found' , 404));
        }

        res.status(200).json({
            status : 'success',
            data : note
        });

    } catch (err) {
        next(new AppError('Error updating note', 500));
    }
};

// Delete note

module.exports.deleteNote = async (req , res , next) => {
    try {
        const note = await Notes.findOneAndUpdate(
            {
                _id : req.params.id,
                owner : req.user.id,
                isDeleted : false
            },
            {
                idDeleted : true,
                deletedAt : new Date()
            }
        )

        if(!note) {
            return next(new AppError('Note not found' , 404));
        }

        res.status(200).json({
            status : 'success',
            message : 'Note deleted successfully'
        });
    } catch (err) {
        next(new AppError('Error deleting note', 500));
    }
};
