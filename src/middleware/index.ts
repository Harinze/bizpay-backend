import express from 'express';
import { createUserProfile, checkExistingUser } from '../controllers/user';
import { loginUser } from '../controllers/auth';
import authenticateToken from '../authentication/auth';

const router = express.Router();

router.post('/create-profile', checkExistingUser, createUserProfile);
router.post('/login', authenticateToken, loginUser);

export default router;
