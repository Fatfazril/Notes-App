const express = require("express");
const noteController = require("../controllers/noteController");
const validate = require ('../middlewares/validate.js')
const authMiddleware = require('../middlewares/authMiddleware')
const {noteValidation, noteUpdateValidation} = require( "../validation/noteValidation.js")

const router = express.Router();

// Get all notes
router.get("/", noteController.getAllNotes);

// Get note by ID
router.get("/:id", noteController.getNoteById)

// Create note
router.post("/", authMiddleware, validate(noteValidation) , noteController.createNote);

// Update note
router.put("/:id", authMiddleware, validate(noteUpdateValidation) ,noteController.updateNote);

// Delete note
router.delete("/:id", authMiddleware, noteController.deleteNote);

module.exports = router;
