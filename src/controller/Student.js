const mentorModel = require("../models/Mentor");
const studentModel = require("../models/Student");

const getStudents = async (req, res) => {
  try {
    let students = await studentModel.find();
    res.status(200).send({
      message: "Students data fetched Successfully",
      students
    });
  } catch (error) {
   
    res.status(500).send({
      message: "Internal Server Erorr",
      error: error.message,
    })
  }
}

const createStudent = async (req, res) => {
 
  try {
    let students = await studentModel.findOne({Email:req.body.Email});
    if(!students){
        await studentModel.create(req.body)
        res.status(201).send({
         message: "Student Created Sucessfully",
        students
    })
}
else{
    res.status(400).send({message:`Student with ${req.body.Email} Already Exists`})
}
  } catch (error) {
    res.status(400).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const changeStudentMentor = async (req, res) => {
  try {
    let student = await studentModel.findOne({ _id: req.params.id });
    if (
      student.currentMentor !== null &&
      student.currentMentor !== "" &&
      student.currentMentor !== undefined
    ) {
      if (student.currentMentor === req.body.mentor_id) {
        return res.status(201).send({
          message: "current and new mentor is same person!..",
        });
      }
      const cMentor = student.currentMentor;
      student.currentMentor = req.body.mentor_id;
      student.previousMentor = cMentor;
  
      const prevMent = await mentorModel.findOne({
        _id: student.previousMentor,
      });
    
      if (prevMent && prevMent.studentlist.length > 0) {
        const stuList = prevMent.studentlist.filter(
          (sid) => sid !== req.params.id
        );
        prevMent.studentlist = stuList;
       
      }
      res
        .status(201)
        .send({ message: "Student mentor has been changed successfully" });
    } else {
      student.currentMentor = req.body.mentor_id;
      
    }
  } catch (error) {
    res.status(400).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


const showPreviousMentor = async (req, res) => {
  try {
    let student = await studentModel.findOne({ _id: req.params.id });
    if (student?.previousMentor) {
      const prevMent = await mentorModel.findOne({
        _id: student.previousMentor,
      });
      res.status(200).send({
        message: "Previous mentor Details",
        prevMent,
      });
    } else {
      res.status(200).send({
        message: "There is no Previous mentor for this student",
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};



module.exports = {
  getStudents,
  createStudent,
  changeStudentMentor,
  showPreviousMentor
  
};