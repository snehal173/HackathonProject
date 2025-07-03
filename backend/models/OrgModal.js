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
    profileImage:{
        type:String,
    },
    description:{
        type:String,
        default:""
    },
    hackathons:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Hackathon'
        }
    ]
})

const OrganisationModel=mongoose.model("Organisation",OrgSchema);
module.exports=OrganisationModel