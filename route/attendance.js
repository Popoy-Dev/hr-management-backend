const express = require('express')
const { postAttendance } = require('../controller/attendance')
const router = express.Router()



router.route('/').post(postAttendance)


module.exports = router