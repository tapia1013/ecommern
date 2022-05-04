import jwt from 'jsonwebtoken';
import asynHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asynHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // decode the token
    try {
      // Assign token
      token = req.headers.authorization.split(' ')[1]

      // takes in token & secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // fetch the user with User Model, return user data without password
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error);
      res.status(401)
      throw new Error('Not Authorized, Token Failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Unauthorized, no token')
  }

})


export { protect }