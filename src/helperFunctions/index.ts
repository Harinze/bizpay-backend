import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, `${process.env.APP_SECRET}`, { expiresIn: '7d' });
};

export const decodeToken = (token:string) => {
    return jwt.verify(token, process.env.APP_SECRET as string) as { userId: string };
}