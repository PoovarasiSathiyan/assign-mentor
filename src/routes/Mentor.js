const express = require('express')
const MentorController = require('../controller/Mentor')
const router = express.Router()

router.get('/',MentorController.getMentors)
router.post('/create',MentorController.createMentor)
router.put('/:id',MentorController.assignStudent)
router.get('/stulistformentor/:id',MentorController.showStuList)

module.exports = router