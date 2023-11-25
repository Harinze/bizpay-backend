// src/controllers/userProfileController.ts
import { Request, Response, NextFunction } from 'express';
import UserProfileModel  from '../model/user';

export const checkExistingUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, businessName, phoneNumber, uniqueId } = req.body;

    const existingUser = await UserProfileModel.findOne({
      $or: [
        { email },
        { businessName },
        { phoneNumber },
        { uniqueId },
      ],
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User with the provided details already exists.' });
    }

    next();
  } catch (error) {
    console.error('Error checking existing user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createUserProfile = async (req: Request, res: Response) => {
  try {
    const userProfile = new UserProfileModel(req.body);
    const savedProfile = await userProfile.save();
    res.status(200).json({
        message:`Profile was created successfully`,
        data:savedProfile
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
    res.status(500).json({ error: 'Error creating user profile' });
  }
};
