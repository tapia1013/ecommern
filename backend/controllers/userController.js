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




// @desc     Auth user profile
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




export {
  authUser,
  getUserProfile
}