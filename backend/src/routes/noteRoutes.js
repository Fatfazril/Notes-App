const express = require("express");
const noteController = require("../controllers/noteController");

const router = express.Router();

// Get all notes
router.get("/", noteController.getAllNotes);

// Get note by ID
router.get("/:id", noteController.getNoteById);

// Create note
router.post("/", noteController.createNote);

// Update note
router.put("/:id", noteController.updateNote);

// Delete note
router.delete("/:id", noteController.deleteNote);

module.exports = router;
