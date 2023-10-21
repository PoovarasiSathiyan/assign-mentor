const express = require('express')
const route = express.Router()

const StudentRoutes = require('../routes/Student')
route.use('/students',StudentRoutes)

const MentorRoutes = require('../routes/Mentor')
route.use('/mentors',MentorRoutes)

module.exports = route;