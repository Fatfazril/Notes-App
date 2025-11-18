const AppError = require('../utils/AppError');
const Notes = require('../models/Notes');

// Get all notes
module.exports.getAllNotes = async (req, res, next) => {
    try {
        const notes = await Notes.find();

        res.status(200).json({
            status: 'success',
            count : notes.length,
            data: notes
        });
    } catch (err) {
        next(new AppError('Error fetching notes', 500));
    }
};

// Get note by ID
module.exports.getNoteById = async (req, res, next) => {
    try {
        const note = await Notes.findById(req.params.id);
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
        const {title, content} = req.body;
        
        if(!title || !content) {
            return next(new AppError('Title and Content are required' , 400));
        }

        const newNote = await Notes.create({ title, content });
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
        const note = await Notes.findByIdAndUpdate(
            req.params.id, 
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
        const note = await Notes.findByIdAndDelete(req.params.id);

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
