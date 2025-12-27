import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    firstname:{
        type:String,
        required:true
        },
    lastname:{
        type:String,
        required:true   
    },
    password:{
        type:String,
        required:true
    },
    isBloked:{
        type:Boolean,
        default:false
    },
    type:{
        type:String,
        default:"customer"
    },
    profilePic:{
        type:String,
        default:"https://www.freepik.com/free-vector/blue-circle-with-white-user_145857007.htm#fromView=keyword&page=1&position=0&uuid=54a0ef2c-9163-4050-946d-28f8938f480a&query=User+profile"
    }
})
const User=mongoose.model("Users",userSchema)
export default User;