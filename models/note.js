const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

const noteSchema = new mongoose.Schema({
    title:{
       type:String,
       required:true
    },
    description:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true
    },
    user:{
        type:ObjectId,
        ref:'USER'
    }
})

const note = mongoose.model('NOTE', noteSchema)
module.exports = note