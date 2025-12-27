import express from 'express';
import bodyParser from 'body-parser'; 
import mongoose from 'mongoose';


import userRouter from './routes/userRouter.js';
import productsRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRouter.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

const mongoUrl=process.env.MONGO_DB_URI;
mongoose.connect(mongoUrl,{})
const connection=mongoose.connection;
connection.once('open',()=>{
  console.log("MongoDB database connection established successfully");
})

app.use(bodyParser.json())
app.use(
  (req, res, next) => {
   const token= req.header("Authorization")?.replace("Bearer ","")
   console.log(token);
    if(token!=null){
      jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(!err){
         console.log(decoded);
         req.user=decoded;
        }
      })
    }
    next();
  }
                                                             
)

app.use('/users',userRouter);
app.use('/products',productsRouter);
app.use('/orders',orderRouter);


app.get("/",
  (req,res)=>{
    console.log() 
    console.log(req.body) ;
    console.log("this is a get request") ;
    res.json({message:"hello world"})
  }
);


    
      
    


    
    
  


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});