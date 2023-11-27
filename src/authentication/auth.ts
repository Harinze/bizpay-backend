import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { decodeToken } from '../helperFunctions';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header('Authorization');

    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Unauthorized - No Authorization header provided.' });
    }

    const [bearer, token] = authorizationHeader.split(' ');

    if (!bearer || !token || bearer.toLowerCase() !== 'bearer') {
      return res.status(401).json({ message: 'Unauthorized - Invalid Authorization header format.' });
    }
    
    const decoded = decodeToken(token)
    
    req.body.userId = decoded.userId;
    res.cookie('userId', decoded.userId, { httpOnly: true, secure: true });

    next();
  } catch (error) {
    console.error('Error during token verification:', error);

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Unauthorized - Token has expired.' });
    }

    return res.status(401).json({ message: 'Unauthorized - Invalid token.' });
  }
};

export default authenticateToken;



