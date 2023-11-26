import express from 'express';
import { userLogin, userSignup,createClientProfile  } from '../controllers/user';
import authenticateToken from '../authentication/auth';

const router = express.Router();

router.post('/createclient', authenticateToken, createClientProfile);
router.post('/login', userLogin);
router.post('/signup', userSignup)

export default router;
