const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    userName:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
    },
   
   additinalDetails:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Profile"
   }
})

const UserModel=mongoose.model("User",userSchema);
module.exports=UserModel;