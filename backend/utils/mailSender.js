const nodemailer=require("nodemailer")

require('dotenv').config()

const mailSender=async(email,title,body)=>{
    try{
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port:465,
            secure:true,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        let info=await transporter.sendMail({
            from:'HackMol',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
        return info

    }catch(error){
       console.log(error)
    }
}

module.exports=mailSender