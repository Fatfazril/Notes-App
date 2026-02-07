const express = require("express");
const noteController = require("../controllers/noteController");
const validate = require ('../middlewares/validate.js')
const NoteValidation = require( "../validation/noteValidation.js")

const router = express.Router();

// Get all notes
router.get("/", noteController.getAllNotes);

// Get note by ID
router.get("/:id", noteController.getNoteById);

// Create note
router.post("/",  validate(NoteValidation) , noteController.createNote);

// Update note
router.put("/:id", validate(NoteValidation) , noteController.updateNote);

// Delete note
router.delete("/:id", noteController.deleteNote);

module.exports = router;
