const userModel=require('../models/UserModal');
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")


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

module.exports={signup,login};
