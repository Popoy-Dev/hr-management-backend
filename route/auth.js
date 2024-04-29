const express = require('express')
const { createUser, loginUser, getUserDetails } = require('../controller/user')
const router = express.Router()




router.route('/signup').post(createUser)
router.route('/').get(getUserDetails)
router.route('/login').post(loginUser)


module.exports = router