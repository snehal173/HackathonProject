const mongoose=require("mongoose");

const HackathonSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true,
    },
    Location:{
        type:String,
        trim:true
    },
    orgId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Organisation',
       required:true
    },
    participants:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User',
       required:true
    }],
    mode:{
        type:String,
        enum:["Online","Offline"],
        required:true
    }
})

const HackathonModel=mongoose.model("Hackathon",HackathonSchema);
module.exports=HackathonModel;
