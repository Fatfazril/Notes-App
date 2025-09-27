const Notes = require('../models/Notes');

module.exports.getNotes = (async (req, res) => {
    try {
        const notes = await Notes.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching notes', error: err });
    }
})

module.exports.createNote = (async(req , res) => {
    const { title, content } = req.body;

    try {
        const newNote = new Notes({ title, content });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).json({ message: 'Error creating note', error: err });
    }
})
