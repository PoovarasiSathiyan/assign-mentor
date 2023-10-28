const mentorModel = require("../models/Mentor");
const studentModel = require("../models/Student");

const getMentors = async (req, res) => {
  try {
    let mentors = await mentorModel.find();
    res.status(200).send({
      message: "data fetched Successfully",
      mentors
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Erorr",
      error: error.message
    });
  }
};

const createMentor = async (req, res) => {
  try {
    let mentor = await mentorModel.findOne({Email:req.body.Email})
    if(!mentor){
    await mentorModel.create(req.body);
    res.status(201).send({
        message: "Mentor created Successfully",
        
      })
    }
    else{
        res.status(400).send({message:`Mentor with ${req.body.Email} already exists`})
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message
    })
  }
}

const assignStudent = async (req, res) => {
  try {
    let mentor = await mentorModel.findOne({ _id: req.params.id });
   
    if (mentor) {
      let totalstudents = mentor.studentlist.concat(req.body);
      mentor.studentlist = [...new Set(totalstudents)];
      let idCriteria = {
        _id: { $in: mentor.studentlist },
      };
      const selectedStudentList = await studentModel.find(idCriteria);
      const studentHasMentorList = selectedStudentList.filter(
        (student) =>
          student.currentMentor !== null &&
          student.currentMentor !== undefined &&
          student.currentMentor !== "" && student.currentMentor !== req.params.id
      );

      if (studentHasMentorList.length === 0) {
        
        const updatedmentor = await mentorModel.updateOne(
          { _id: req.params.id },
          { $set: { ...mentor } }
        );

       
        const result = await studentModel.updateMany(
          idCriteria,
          { currentMentor: req.params.id },
          { multi: true }
        );
        res.status(201).send({
          message: "Students have assigned to mentor",
        });
      } else {
        res.status(201).send({
          message:
            "Some of your students have already assigned to another mentor.",
        });
      }
    } else {
      res.status(201).send({
        message: "Invalid mentor Id",
      });
    }
   
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const showStuList = async (req, res) => {
  try {
    const mentor = await mentorModel.findOne({ _id: req.params.id });
    let idCriteria = {
      _id: { $in: mentor.studentlist },
    };
    const StudentDetails = await studentModel.find(idCriteria);

    res.status(201).send({
      message: "Data Fetched Successfully",
      StudentDetails,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


module.exports = { getMentors, createMentor,showStuList,assignStudent };