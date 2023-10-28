const express = require('express')
const StudentController = require('../controller/Student')
const router = express.Router()

router.get('/',StudentController.getStudents)
router.post('/createStudent',StudentController.createStudent)
router.put('/changeStudentMentor/:id',StudentController.changeStudentMentor)
router.get('/showprevmentor/:id',StudentController.showPreviousMentor)


module.exports = router