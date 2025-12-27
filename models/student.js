import mongoose from 'mongoose';    
    const studenSchema= mongoose.Schema({
      name:String,
      age:Number,
      gender:String
    })

    const Student=mongoose.model("Student",studenSchema)
    export default Student;