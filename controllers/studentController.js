import Student from '../models/student.js';
import dotenv from 'dotenv';
dotenv.config();

function getStudents  (req,res) {
    Student.find().then(
        (studentList)=>{
      res.json({
        list:studentList
    })
    } )
  }

  function createStudent  
    (req,res){
   const newStudent=new Student(req.body)
    newStudent.save().then(()=>{
      res.json({message:"student added successfully from student router"})

    }).catch((err)=>{
      res.json({message:"student not created",error:err})
    } )
  }


  function deleteStudent (req,res){
      const { name } = req.body || {};
      if (!name) {
        res.status(400).json({message:"student name is required"});
        return;
      }
      Student.deleteOne({name}).then(()=>{
      res.json({message:"student deleted successfully"})
    }).catch((err)=>{
      res.json({message:"student not deleted",error:err})
    })
}

  export {getStudents,createStudent,deleteStudent};