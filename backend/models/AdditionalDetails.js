const mongoose=require("mongoose");

const ProfileSchema=new mongoose.Schema({
     profileImage:{
      type:String,
     default:"",
     },
     userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
     },
     location:{
        type:"String",
        default:"",
        required:true
     },
     dateOfBirth:{
        tyoe:Date,
        default:"",
     },
     bio:{
       type:String,
       default:"",
     },
     skills:{
       type:[String],
       default:[]
     },
     collegeName:{
        type:String,
        default:""
     },
     hackathons:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Hackathon'
        }
     ]

     ,
     teamates:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
     }]
},{timeStamps:true})


const ProfileModel=mongoose.model("Profile",ProfileSchema);
module.exports=ProfileModel