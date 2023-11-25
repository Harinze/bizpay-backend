
import { Request, Response, NextFunction } from 'express';
import UserProfileModel, { IUserProfile }  from '../model/user';
import { generateToken } from '../helperFunctions';

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
    const userProfileData: IUserProfile = req.body;
    const userProfile = new UserProfileModel(userProfileData);

    const savedProfile = await userProfile.save();

    if (savedProfile) {
      const token = generateToken(savedProfile.uniqueId,savedProfile.email);

      res.status(200).send({
        message:`profile for ${savedProfile.businessName} has been created`,
        data: { userProfile: savedProfile, token },
      });
      res.cookie('userId', savedProfile._id, { httpOnly: true, secure: true });

    } else {
      res.status(500).json({ error: 'Error generating token' });
    }
  } catch (error) {
    console.error('Error creating user profile:', error);
    res.status(500).json({ error: 'Error creating user profile' });
  }
};
