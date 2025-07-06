const userModel=require('../models/userModal');
const jwt=require("jsonwebtoken")
const bcrypt =require("bcrypt")
const userAddDetailsModel=require("../models/AdditionalDetails")
const HackathonModel=require("../models/hackathonModal")

const signup=async(req,res)=>{
    try{

        const {firstName,lastName,email,password,userName}=req.body;
        if(!firstName || !lastName || !email ||!password || !userName){
            return res.status(400).json({message:"ALL FIELD SRE REQUIRED"});
        }

        const emailExistingUser=await userModel.findOne({email:email});
        if(emailExistingUser){
            return res.status(400).json({message:"User with this email already exists"});
        }

        const userNameExistingUser=await userModel.findOne({userName:userName});
        if(userNameExistingUser){
            return res.status(400).json({message:"User with this userName already exists"});
        }

         const hashPassword=await bcrypt.hash(password,10);
         const user=await userModel.create({
         firstName:firstName,
         lastName:lastName,
         userName:userName,
         email:email,
         password:hashPassword
       })
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.cookie("token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite: "Lax", 
        secure: false 
       })
       return res.status(201).json({
        message:"User has signed in successfully",
        user,token
       })

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}

const login=async(req,res)=>{
   try{
    const {email,password}=req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

    
    const user=await userModel.findOne({email:email});
    if(!user){
        return res.status(401).json({
            message:"user does not exist"
        })
    }
    const isPasswordMatch=await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
       return res.status(400).json({message:"incorrect password"})
    }

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.cookie("token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"Lax",
        secure:false
    })
    console.log(user,token);
    return res.status(200).json({
        message:"user login successfully",
        token,user
    })
    
   }catch(error){
      console.log(error);
     return res.status(500).json({
        message:"error while login in"
     })
   }

}

const getUserProfile=async(req,res)=>{
 try{
    const user=req.user;
    if(!user){
      return res.status(400).json({message:"user does not exist"});
    }
    return res.status(200).json({
      message:"user data fetched successfully",
      user
    })
 }catch(error){
    console.log(error);
    return res.status(400).json({
        message:"get current user error"
    })
 }
}

const enrollUser=async(req,res)=>{
    try{
        const userId=req.user._id;
        const {hackathonId}=req.body;
        if(!userId || !hackathonId){
            return res.status(404).json({
                message:"all fields are required"
            })
        }
        const finduser=await userModel.findById(userId)
        if(!finduser){
            return res.status(404).json({
                message:"user not found with the give userid"
            })
        }
        const hackathon=await HackathonModel.findByIdAndUpdate(hackathonId,
            {$push:{participants:userId}},
            {new:true}
        )
        if(!hackathon){
            return res.status(404).json({
                message:"hackathon not found"
            })
        }
        const user=await userAddDetailsModel.findOneAndUpdate(
            {userId},
            {$push:{hackathons:hackathonId}},
            {new:true}
        )
         if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }
        return res.status(200).json({
        message: "User enrolled in hackathon successfully",
        user,
        hackathon
        });


    }catch(error){
       console.log(error);
       return res.status(404).json({
        message:"error while registering in the hackathon"
       })
    }
}

const unregisterUser = async (req, res) => {
  try {
     const userId=req.user._id;
    const { hackathonId } = req.body;

    if (!userId || !hackathonId) {
      return res.status(400).json({
        message: "userId and hackathonId are required"
      });
    }

    const findUser = await userModel.findById(userId);
    if (!findUser) {
      return res.status(404).json({
        message: "User not found with the given userId"
      });
    }

    const hackathon = await HackathonModel.findByIdAndUpdate(
      hackathonId,
      { $pull: { participants: userId } },
      { new: true }
    );
    if (!hackathon) {
      return res.status(404).json({
        message: "Hackathon not found"
      });
    }

    const user = await userAddDetailsModel.findOneAndUpdate(
      { userId },
      { $pull: { hackathons: hackathonId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        message: "User details not found"
      });
    }

    return res.status(200).json({
      message: "User unregistered from hackathon successfully",
      user,
      hackathon
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error while unregistering from the hackathon"
    });
  }
};


module.exports={signup,login,enrollUser,unregisterUser,getUserProfile};
