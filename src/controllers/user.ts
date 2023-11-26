
import { Request, Response } from 'express';
import UserProfileModel from '../model/user';
import { generateToken } from '../helperFunctions';
import bcrypt from 'bcrypt'; 
import ClientProfileModel from '../model/client';

export const createClientProfile = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      businessName,
      businessNumber,
      phoneNumber,
      address,
      uniqueId,
      amount,
      date,
      status,
      invoiceName,
      invoiceDate,
      invoiceNumber,
      paymentConfirmation,
      totalOverduePayment,
      profile,
    } = req.body;

    const requiredFields = [
      'fullName',
      'email',
      'businessName',
      'businessNumber',
      'address',
      'phoneNumber',
      'uniqueId',
      'amount',
      'date',
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
    }

    const existingProfile = await ClientProfileModel.findOne({
      $or: [
        { email },
        { businessNumber },
        { amount },
        { uniqueId },
      ],
    });

    if (existingProfile) {
      return res.status(400).json({ message: 'Client profile with the provided details already exists.' });
    }

    const newClientProfile = new ClientProfileModel({
      fullName,
      email,
      businessName,
      businessNumber,
      address,
      phoneNumber,
      uniqueId,
      amount,
      date,
      status,
      invoiceName,
      invoiceDate,
      invoiceNumber,
      paymentConfirmation,
      totalOverduePayment,
      profile,
    });

    const savedClientProfile = await newClientProfile.save();

    res.status(201).json({ message: 'Client profile created successfully', profile: savedClientProfile });
  } catch (error) {
    console.error('Error during client profile creation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const userSignup = async (req: Request, res: Response) => {
  try {
    
    const { fullName, email, password, phoneNumber, businessName, descriptionOfBusiness, address, image } = req.body;

    if (!fullName || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingUserByEmail = await UserProfileModel.findOne({ email });
    const existingUserByPhoneNumber = await UserProfileModel.findOne({ phoneNumber });

    if (existingUserByEmail) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    if (existingUserByPhoneNumber) {
      return res.status(400).json({ message: 'Phone number is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    const newUser = new UserProfileModel({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      businessName,
      descriptionOfBusiness,
      address,
      image
    });

    const savedUser = await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const userLogin = async (req: Request, res: Response) => {
  try {

    const { email, password, phoneNumber} = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    if (!phoneNumber) {
        return res.status(400).json({message: `Phone number is required`})
    }

     if (!password) {
        return res.status(400).json({message: `Password is required`})
    }

    const user = await UserProfileModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const userPhoneNumber = await UserProfileModel.findOne({ phoneNumber });
     if (!userPhoneNumber) {
      return res.status(404).json({ message: `phone number is not found!` });
    }
   
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = generateToken(user._id)

    res.json({ token, userId: user._id });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
