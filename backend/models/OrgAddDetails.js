const mongoose=require('mongoose');

const OrgSchema=new mongoose.Schema({
    profileImage:{
        type:String,
    },
    description:{
        type:String,
        default:""
    },
    address:{
      type:String,
        default:""
    },
    city:{
        type:String,
        default:""
    },
    state:{
       type:String,
        default:""
    },
    hackathons:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Hackathon'
        }
    ],
    orgId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Organisation',
        required:true
    }
})

const OrgAddDetailsModel=mongoose.model("OrgAddDetails",OrgSchema);
module.exports=OrgAddDetailsModel;