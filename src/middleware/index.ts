// src/routes/userProfileRoutes.ts
import express from 'express';
import { createUserProfile, checkExistingUser } from '../controllers/user';

const router = express.Router();

router.post('/create-profile', checkExistingUser, createUserProfile);

export default router;
