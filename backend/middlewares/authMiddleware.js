const jwt=require("jsonwebtoken")
const userModel=require("../models/userModal")
const orgModel=require('../models/OrgModal')

const authUser=async(req,res,next)=>{
    try{
        const token=req.cookies?.token || req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(404).json({
                message:"token is missing"
            })
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        console.log(decode)
        const userId=decode.id

        const user=await userModel.findById(userId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user=user
        next()

    }catch(error){
        console.log(error)
        return res.status(401).json({
            message:"error in auth middleware"
        })
    }
}


const authOrg=async(req,res,next)=>{
    try{
        const token=req.cookies?.token || req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(404).json({
                message:"token is missing"
            })
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        console.log(decode)
        const orgId=decode.id

        const org=await orgModel.findById(orgId);
        if (!org) {
            return res.status(401).json({ message: "User not found" });
        }
        req.org=org
        next()

    }catch(error){
        console.log(error)
        return res.status(401).json({
            message:"error in auth middleware"
        })
    }
}

module.exports={authUser,authOrg}