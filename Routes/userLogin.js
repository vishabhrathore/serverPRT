const express = require("express")
const router = express.Router()
const userModel = require("../models/user")
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
const bcrypt = require("bcrypt")
dotenv.config()
const secretKey = process.env.SCERET_KEY


router.post("/userLogin", async (req, res) => {

    const { email, password } = req.body
    try {

        if (!email || !password) {
            return res.status(400).send("Please Fill all Fields")
        }

        const data = await userModel.findOne({ email })
        if (data) {
            const checkPassword = await bcrypt.compare(password, data.password)
            console.log(checkPassword)
            if (!checkPassword) {
                return res.status(401).send("Invalid credentials")
            }else{
                const payload = {
                    name: data.name,
                    email : data.email
                }

                const token = jwt.sign(payload,secretKey,{
                    expiresIn: "100m"
                })

                res.status(200).json({
                    message:"Login Sucessfully",
                    jwt:token
                })
            }
        }else{
            return res.status(400).send("User don't exist")
        }
        
    } catch (error) {

        res.status(401).send("Failed to Login")

    }

})

module.exports = router