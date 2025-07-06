const { resetPasswordTemplate } = require("../mailTemplates/resetPassword")
const userModel=require("../models/userModal")
const orgModel=require("../models/OrgModal")
const mailSender = require("../utils/mailSender")
const bcrypt=require("bcrypt")
const crypto = require('crypto');

const resetPasswordtoken=async(req,res)=>{
    try{
        const {email}=req.body
       if(!email){
        return res.status(404).json({
            message:"email is missing"
        })
       }

       const user=await userModel.findOne({email:email})
       if(!user){
         return res.status(404).json({
            message:"user is missing"
        })
       }
       const token=crypto.randomBytes(20).toString('hex')

       await userModel.findOneAndUpdate(
            { email: email },
            { token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 }, // valid for 5 minutes
            { new: true }
        )
        const url=`process.env.FRONTEND_URL/update-password/${token}`
        await mailSender(email,"Request to reset password",resetPasswordTemplate(url,`user.firstName`))

        res.status(200).json({
        success: true,
        message: "Email sent Successfully!"
});

    }catch(error){
        console.log(error)
        return res.status(401).json({
            message:"error in resettokencontroller"
        })
    }
}

const userResetPasswordUpdate=async(req,res)=>{
    try{
       const { newPassword, confirmNewPassword, token }=req.body;
       if(!newPassword|| !confirmNewPassword ||!token){
        return res.status(404).json({
            message:"all fields are required"
        })
       }

       if(newPassword !==confirmNewPassword){
         return res.status(404).json({
            message:"passwords do not match"
        })
       }

       const user = await userModel.findOne({ token: token });
       if(user){
         return res.status(404).json({
            message:"user is missing"
        })
       }
       if (user.resetPasswordExpires < Date.now()) {
       return res.status(403).json({
        success: false,
        message: "Token is expired"
       })
      }

      const hashedPassword=await bcrypt.hash(newPassword, 10);

      await userModel.findOneAndUpdate(
        token,
        {password:hashedPassword},
        {new:true}
      )
      res.status(200).json({
      success: true,
      message: "Password is Updated Successfully"
      });

    }catch(error){
       console.log(error)
        return res.status(401).json({
            message:"error in resetpasswordupdate"
        })
    }
}

const orgResetPasswordUpdate=async(req,res)=>{
    try{
       const { newPassword, confirmNewPassword, token }=req.body;
       if(!newPassword|| !confirmNewPassword ||!token){
        return res.status(404).json({
            message:"all fields are required"
        })
       }

       if(newPassword !==confirmNewPassword){
         return res.status(404).json({
            message:"passwords do not match"
        })
       }

       const user = await orgModel.findOne({ token: token });
       if(user){
         return res.status(404).json({
            message:"user is missing"
        })
       }
       if (user.resetPasswordExpires < Date.now()) {
       return res.status(403).json({
        success: false,
        message: "Token is expired"
       })
      }

      const hashedPassword=await bcrypt.hash(newPassword, 10);

      await orgModel.findOneAndUpdate(
        token,
        {password:hashedPassword},
        {new:true}
      )
      res.status(200).json({
      success: true,
      message: "Password is Updated Successfully"
      });

    }catch(error){
       console.log(error)
        return res.status(401).json({
            message:"error in resetpasswordupdate"
        })
    }
}

module.exports={resetPasswordtoken,orgResetPasswordUpdate,userResetPasswordUpdate}


