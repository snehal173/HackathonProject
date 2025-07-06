const mongoose=require('mongoose');

const OrgSchema=new mongoose.Schema({
    name:{
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
    password:{
        type:String,
        required:true
    },
    token:{
        type: String
    },
    resetPasswordExpires:{
        type: Date
    }
   
   
},{timestamps:true})

const OrganisationModel=mongoose.model("Organisation",OrgSchema);
module.exports=OrganisationModel