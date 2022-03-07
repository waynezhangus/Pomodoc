const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

const userCtrl = {
  // @desc    Register a new user
  // @route   /api/users
  // @access  Public
  registerUser: asyncHandler( async (req, res) => {
    const { name, email, password } = req.body

    // Validation
    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Please include all fields')
    }
    const userExists = await User.findOne({ email })
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new error('Invalid user data')
    }
  }),
  
  // @desc    Login a user
  // @route   /api/users/login
  // @access  Public
  loginUser: asyncHandler(async (req, res) => {
    const { email, password } = req.body
  
    //Authentication
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid credentials')
    }
  }),

  // @desc    Get current user
  // @route   /api/users/me
  // @access  Private
  getMe: asyncHandler(async (req, res) => {
    const user = {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
    }
    res.status(200).json(user)
  }),
}

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = userCtrl