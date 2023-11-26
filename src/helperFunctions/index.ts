import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, `${process.env.APP_SECRET}`, { expiresIn: '7d' });
};
