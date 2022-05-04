import express from 'express';
const router = express.Router();
import {
  authUser,
  getUserProfile
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';



router.post('/login', authUser)
// to implment middleware we put it as a first argument
router.route('/profile').get(protect, getUserProfile)


export default router