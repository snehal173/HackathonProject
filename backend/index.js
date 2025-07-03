const dotenv=require('dotenv');
const express=require('express');
const userRoutes=require('./routes/UserRoutes');
const orgRoutes=require('./routes/OrgRoutes');
const cors=require('cors')
const connectDB=require('./config/Database')
const app=express()
dotenv.config();

connectDB();
const PORT=process.env.PORT || 3000;
app.use(cookieParser()); 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))



app.use('/api/v1/user',userRoutes);
app.use('/api/v1/post',orgRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})


