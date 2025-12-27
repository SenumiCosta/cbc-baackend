import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function createUser(req, res) {  
    const newUserData= req.body;
    if(newUserData.type == "admin"){
        if(!req.user!=null && req.user.type!="admin"){
         res.json({message:"only admin can create another admin user"})
         return;
        }
        if (req.user.type !== "admin") {
            res.json({ message: "only admin can create another admin user" });  
            return;
        }       

    }


    newUserData.password= bcrypt.hashSync(newUserData.password,10);
    console.log(newUserData);

    const user= new User(newUserData);
    user.save().then(()=>{
        res.json({message:"user created successfully"})
    }).catch(()=>{
        res.json({message:"user creation failed"})
    })
}  


    
export function loginUser(req, res) {
    User.findOne({ email: req.body.email })
        .then((user) => {

            
            if (!user) {
                return res.json({ message: "user not found" });
            }

            
            const isPasswordCorrect = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (isPasswordCorrect) {
               const token=jwt.sign({
                email:user.email,
                firstName:user.firstName,
                lastName:user.lastName,
                isBlocked:user.isBlocked,
                type:user.type,
                profilePic:user.profilePic



               },process.env.SECRET_KEY)
                res.json({ message: "login successful", token: token });
            } else {
                res.json({ message: "incorrect password" });    

            }
        })
    }

    export function isAdmin(req){
        if(req.user==null){
            return false;
        }
        if(req.user.type!="admin"){
            return false;
        }
        return true;
    }   
    


