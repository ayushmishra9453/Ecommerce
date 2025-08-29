const mongoose=require('mongoose')

require("dotenv").config;


const connectDatabase=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
        
    })
    .then((data)=>{
        console.log(`mongodb connection with server:${data.connection.host}`)
    })
    // .catch((error)=>{
    //     console.log(error)
    // })
}

module.exports=connectDatabase;