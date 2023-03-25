const moongoose = require("mongoose")
const dotenv = require("dotenv")
moongoose.set('strictQuery', false);
dotenv.config();

async function getConnection (){
    await moongoose.connect(process.env.DB_URL).then(()=>{
        console.log("Connected successfully with DataBase")
    }).catch((e)=>{
        console.log(e)
    })
}

module.exports = getConnection