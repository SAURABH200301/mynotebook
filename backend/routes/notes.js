const express = require('express');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { json } = require('express');

//ROUTE 1: Get all the notes. using : GET  "/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server error Occured");
    }

});

//ROUTE 2: Add a new notes. using : POST  "/api/notes/addnote" Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        //if there are errors,return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();

        res.json(savedNote);
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server error Occured");
    }

});

//ROUTE 3: Update a notes. using : PUT  "/api/notes/updatenote" Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //CREATE A NEWNOTE OBJECT
        const newNote = {};

        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the note to be udpated using id

        let note = await Note.findById(req.params.id);
        // console.log("note",note);
        if (!note) {
            res.status(404).send("Not Found")
        }
        console.log(note.user)
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server error Occured");
    }

});

//ROUTE 4: Delete a notes. using : DELETE  "/api/notes/deletenote" Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        //Find the note to be deleted using id
        let note = await Note.findById(req.params.id);
        // console.log("note",note);
        if (!note) {
            res.status(404).send("Not Found")
        }

        //Allow user to delete the notes if the user owns note
        console.log(note.user)
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findOneAndDelete(req.params.id);
        res.json({ "Success": "Successfully note had been deleted", note: note });
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server error Occured");
    }

});

module.exports = router;