const express = require("express")
const router = express.Router()
const notes = require("../models/note")
const authorize = require("../middlewares/auth")

router.get("/findNotes", authorize , async(req,res)=>{
    try {
          let data = await notes.find()  
          res.status(200).json({
            data
          })
    } catch (error) {
            
    }
})
router.post("/createNote",authorize, async(req,res)=>{
    const {title, description} = req.body
    console.log(req.body)
    if(!title || !description ){
       return res.status(400).send("please all field")
    }

    try {
        let note = await notes.create({
            title,
            description,
            date : Date(),
            user: req.user._id
        })

        res.status(200).json({
            status:"Created",
            note : note
        })
    } catch (error) {
        res.status(400).send("error in creatimg note")
    }

})

router.put("/updateNote/:id",authorize, async(req,res)=>{
    const {title, description} = req.body
    if(!title || !description ){
       return res.status(400).send("please fill all field")
    }

    try {

        let note = await notes.updateOne({_id:req.params.id},{
            title,
            description,
            date : Date(),
            user: req.user._id
        } )
        
        if(!note){
            return res.status(400).send("Update unsuccessful")
        }
        let newNote = await notes.findOne({_id:req.params.id})
        res.status(200).json({
            status:"updated succesfully",
            note : newNote
        })

    } catch (error) {
        res.status(400).send("error in updating note")
    }

})


router.delete("/deleteNote/:id",authorize, async(req,res)=>{
    try {
        let note = await notes.deleteOne({_id:req.params.id})
        
        if(!note){
            return res.status(400).send("Delete unsuccessful")
        }
        return res.status(200).send("Deleted Successfully")
    } catch (error) {
        res.status(400).send("error in updating note")
    }
})

module.exports = router