// GoUJeiU2nm838606
const express = require('express')
const app = express()
const cors = require('cors')
const getConnection = require("./connections/conn")
const userRegistration = require("./Routes/userRegster")
const userLogin = require("./Routes/userLogin")
const noteCDUD = require("./Routes/notes")
const port = process.env.PORT
getConnection()
app.use(cors())
app.use(express.json())
app.get("/",(req, res)=>{
    res.send("Hello World")
})
app.use(userRegistration)
app.use(userLogin)
app.use(noteCDUD)


app.listen(port, ()=>{
    console.log(`Server is up at port ${port}`)
})

