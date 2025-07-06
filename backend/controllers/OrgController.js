const orgModel=require('../models/OrgModal')
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const HackathonModel=require("../models/hackathonModal")
const orgAddDetailsModel=require("../models/OrgAddDetails")

const signup=async(req,res)=>{
    try{

        const {name,email,password}=req.body;
        const existingOrg=await orgModel.findOne({email});
        if(existingOrg){
          return res.status(400).json({
            message:"org exists already"
          })
        }
        const hashPassword=await bcrypt.hash(password,10);
        const organisation=await orgModel.create({
            name:name,
            email:email,
            password:hashPassword
        })
        const token=jwt.sign({id:organisation._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.cookie("token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite: "Lax", 
        secure: false 
        })

        return res.status(200).json({
            message:"Organisation created successfully",
            organisation
        })

    }catch(error){
      console.log(error);
      return res.status(400).json({
        mesage:"error while organisation signup"
      })
    }
}

const login=async(req,res)=>{
   try{
    const {email,password}=req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

    
    const organisation=await orgModel.findOne({email:email});
    if(!organisation){
        return res.status(401).json({
            message:"organisation does not exist"
        })
    }
    const isPasswordMatch=await bcrypt.compare(password,organisation.password);
    if(!isPasswordMatch){
       return res.status(400).json({message:"incorrect password"})
    }

    const token=jwt.sign({id:organisation._id},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.cookie("token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"Lax",
        secure:false
    })
    console.log(organisation,token);
    return res.status(200).json({
        message:"org login successfully",
        token,organisation
    })
    
   }catch(error){
      console.log(error);
     return res.status(500).json({
        message:"error while login in"
     })
   }

}


const createHackathon=async(req,res)=>{
  try{
    const {name,description,startDate,endDate,mode,location}=req.body;
     const orgId=req.org._id;
    if(!name || !description ||!startDate || !endDate || !mode || !orgId){
      return res.status(404).json({
        messages:"ALL these fields are required"
      })
    }

    const hackathon=await HackathonModel.create({
       name:name,
       description:description,
       startDate,
       endDate,
       mode,
       location
    })

    const organisation = await orgAddDetailsModel.findOneAndUpdate(
      { orgId },
      { $push: { hackathons: hackathon._id } },
      { new: true }
    );

    if(!organisation){
      return res.status(404).json({
        message:"organisation not found"
      })
    }

    return res.status(200).json({
      message:"hackathon created successfully",
      hackathon
    })


  }catch(error){
    console.log(error);
    return res.status(500).json({
      message:"error while creating hackathon"
    })
  }
}


const deleteHackathon=async(req,res)=>{
  try{
    const orgId=req.org._id;
    const {hackathonId}=req.body;

    if(!hackathonId || !orgId){
       return res.status(404).json({
        message:"fields are missing"
       })
    }

    

    const hackathon=await HackathonModel.findByIdAndDelete(hackathonId);
    
    if(!hackathon){
       return res.status(404).json({
        message:"hackathon not found"
       })
    }

    const organisation=await orgAddDetailsModel.findOneAndUpdate(
    {orgId},
    {$pull:{hackathons:hackathonId}},
    {new:true})

    if(!organisation){
       return res.status(404).json({
        message:"organisation not found"
       })
    }

    return res.status(200).json({
      message:"hackathon deleted successfully",
      hackathon
    })


  }catch(error){
    console.log(error)
    return res.status(500).json({
      "message":"error while deleting hackathon "
    })
  }
}

module.exports={signup,login,createHackathon,deleteHackathon};




