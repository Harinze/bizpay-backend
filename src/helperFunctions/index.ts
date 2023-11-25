import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const generateToken = (email: string, uniqueId: string) => {
  return jwt.sign({ email, uniqueId }, `${process.env.APP_SECRET}`, { expiresIn: '7d' });
};
