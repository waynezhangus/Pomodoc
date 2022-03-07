const express = require('express')
const userCtrl = require('../controllers/userCtrl')
const { protect } = require('../middleware/authMid')

const router = express.Router()

// Register User
router.post('/register', userCtrl.registerUser)
// Login User
router.post('/login', userCtrl.loginUser)
// Get current user
router.get('/me', protect, userCtrl.getMe)

module.exports = router