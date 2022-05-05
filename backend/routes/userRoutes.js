import express from 'express';
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';


router.route('/').post(registerUser)
router.post('/login', authUser)
// to implment middleware we put it as a first argument
router.route('/profile').get(protect, getUserProfile)


export default router