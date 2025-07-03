
const mongoose=reqiure("mongoose");
const dotenv=require('dotenv');
dotenv.config();

function connectDB(){
    try{
        mongoose.connrect(process.env.MONGODB_URL,
            console.log("connected to database successfully")
        )

    }catch(error){
        console.log(error);
        console.error("Error connecting to database",error);
        
    }
}

module.exports=connectDB;

