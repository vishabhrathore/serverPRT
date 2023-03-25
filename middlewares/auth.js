const jwt = require("jsonwebtoken")
const secretKey = process.env.SCERET_KEY
const userModel = require("../models/user")

module.exports = async(req, res, next)=>{
    const { authenticate = ""} = req.headers
    try {
        if(!authenticate){
            return res.status(401).send("token not recieved")
        }

        const data = jwt.verify(authenticate,secretKey)
        console.log(data)

        const user = await userModel.findOne({email:data.email})
        console.log(user)
        if(!user){
            return res.status(400).send("inavalid Json Web Token")
        }

        req.user = user
        next()
    } catch ({error}) {

        res.status(400).json({
            status:"Token Expired"
        })
        
    }
}