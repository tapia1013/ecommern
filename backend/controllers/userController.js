import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';


// @desc     Auth user & get token
// @route    POST /api/users/login
// @access   Public
const authUser = asyncHandler(async (req, res) => {
  // get data from body such as input forms
  const { email, password } = req.body

  // find the user by email
  const user = await User.findOne({ email: email })

  // check if the (user exists && (match encrypted password))
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})



// @desc     ARegister a new user
// @route    POST /api/users
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
  // grab the user info from req.body
  const { name, email, password } = req.body

  // check db if email exists
  const userExists = await User.findOne({ email })

  // check to see if user exists if it does send error
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // create user with User model
  const user = await User.create({
    name,
    email,
    password
  })

  // if user which means user was created and everything is ok
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})




// @desc     Get user profile
// @route    GET /api/users/profile
// @access   Private (we need token)
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  // check for user
  if (user) {
    // return login in user data
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    // 404 = not found
    res.status(404)
    throw new Error('User not found')
  }
})




// @desc     Update user profile
// @route    PUT /api/users/profile
// @access   Private (we need token)
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    })

  } else {
    // 404 = not found
    res.status(404)
    throw new Error('User not found')
  }
})



export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile
}