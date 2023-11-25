// src/controllers/authController.ts
import { Request, Response } from 'express';
import UserProfileModel from '../model/user';
import { generateToken } from '../helperFunctions';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, uniqueId, fullName, phoneNumber } = req.body;

    const user = await UserProfileModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (user.uniqueId === undefined || user.uniqueId === null) {
      return res.status(500).json({ error: 'User uniqueId is missing.' });
    }

    const token = generateToken(user.email, user.uniqueId);
    res.status(200).send({ message:`${user.fullName} is logged in successfully`,token, userId: user._id, user});
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Error during login.' });
  }
};
