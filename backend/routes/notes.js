const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser')
const Note = require('../models/Note')

//Route 1, Get all the notes using get /api/auth
router.get('/fetchallnotes',fetchUser, async (req, res) => {
   
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 2, Add new  notes using post /api/auth
router.post('/addnote', fetchUser, [
    body('title', "Enter a bigger title ").isLength({ min: 3 }),
    body('description', 'Enter a valid description ').isLength({ min: 5 }),
], async (req, res) => {
    try {


        const { title, description, tag } = req.body;
        //If there is any error return bad request  
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal serer error")

    }





})

//Route 3: Update an existing note using. put "/api/auth/updatenote". Login required 

router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const {title,description,tag} = req.body;
    try {
        const newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}
        let note = await Note.findById(req.params.id);
        if(!note){return  res.status(404).send("Not found")}
        if(note.user.toString()!== req.user.id){
            return res.status(401).send("not allowed")
        }
    
        note = await Note.findByIdAndUpdate(req.params.id,{$set : newNote},{new:true})
        res.json({note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal serer error")
    }
   

})

//Route 4: Delete an existing note using. POSST "/api/auth/updatenote". Login required 

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    const {title,description,tag} = req.body;
    try {
         // const newNote = {};
    // if(title){newNote.title = title}
    // if(description){newNote.description = description}
    // if(tag){newNote.tag = tag}
    //node to be deleted
    let note = await Note.findById(req.params.id);
    if(!note){return  res.status(404).send("Not found")}
    //allow deletion only if user user owns this
    if(note.user.toString()!== req.user.id){
        return res.status(401).send("not allowed")
    }

    note = await Note.findByIdAndDelete(req.params.id) 
    res.json({"Success": "note has been deleted",note:note});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal serer error") 
    }
   
})



module.exports = router