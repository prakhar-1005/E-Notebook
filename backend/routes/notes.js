const express = require('express')
const router = express.Router()
const Notes= require('../models/Notes')
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get the notes of a user using: GET "/api/notes/fetchnotes". Login is required here
router.get('/fetchnotes' , fetchUser , async (req,res)=>{

    const notes = await Notes.find({user: req.user.id});
    res.json(notes);

})

// ROUTE 2: Add notes of a user using: POST "/api/notes/addnote". Login is required here
router.post('/addnote' , 
    fetchUser , 
    body('title', "Enter a title").exists() ,
    body('description', "Description must be atleast 5 characters long").isLength({ min: 5 }) , 
    async (req,res)=>{

        // When user does not give correct input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        try {
            // console.log(req.body);
            const {title,description,tag} = req.body;  
            
            // creating a new note
            const note = new Notes ({
                user:req.user.id,
                title:title,
                description:description,
                tag:tag
            })

            const savedNote = await note.save();
            res.json(savedNote);

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Something went wrong")   
        }
})


// ROUTE 3: Update existing notes of a user using: POST "/api/notes/updatenote/:id". Login is required here

router.put('/updatenote/:id' , fetchUser , async (req,res)=>{

        const {title,description,tag} = req.body;

        const updatedNote = {};

        if(title){
            updatedNote.title = title
        }

        if(description){
            updatedNote.description = description;
        }

        if(tag){
            updatedNote.tag = tag
        }

        // finding the note by the id
        let note =await Notes.findById(req.params.id)
        if(!note)
            return res.status(404).send('Not Found');
        
        // console.log(note);
        if(note.user.toString() !== req.user.id)
            return res.status(401).send('Not Allowed');

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: updatedNote} ,{new:true})
        res.json({note});

})



// ROUTE 4: Delete existing note of a user using: DELETE "/api/notes/deletenote/:id". Login is required here

router.delete('/deletenote/:id' , fetchUser , async (req,res)=>{

    // finding the note by the id
    let note =await Notes.findById(req.params.id)
    if(!note)
        return res.status(404).send('Not Found');
    
    // console.log(note);
    if(note.user.toString() !== req.user.id)
        return res.status(401).send('Not Allowed');

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note has been deleted",note:note});

})


module.exports = router;

