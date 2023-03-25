const express = require('express')
const router = express.Router()
const userModel = require("../models/user")
const bcrypt = require("bcrypt")
let saltRounds = 12

router.post("/userregister", async(req, res)=>{
    try {
        const {name , email , password} = req.body
        let data = await userModel.findOne({email})
        if(data){
            res.status(401).send("User already exist")
        }else{
            bcrypt.hash(password, saltRounds, async (err, hash)=>{
                if(err){
                    res.status(400).json({
                        message:err
                    })
                }else{

                    let data = await userModel.create({
                        name,
                        email,
                        password : hash
                    })
                    res.status(200).json({
                        message:"User Created sucessfully",
                        data:data
                    })

                }
            })
            
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router
