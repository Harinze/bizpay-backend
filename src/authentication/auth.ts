// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header('Authorization');

    if (!authorizationHeader) {
      return res.status(401).json({ error: 'Unauthorized - No Authorization header provided.' });
    }

    const [bearer, token] = authorizationHeader.split(' ');

    if (!bearer || !token || bearer.toLowerCase() !== 'bearer') {
      return res.status(401).json({ error: 'Unauthorized - Invalid Authorization header format.' });
    }

    const decoded = jwt.verify(token, process.env.APP_SECRET as string) as { uniqueId: string };

    req.body.uniqueId = decoded.uniqueId;
    res.cookie('userId', decoded.uniqueId, { httpOnly: true, secure: true });

    next();
  } catch (error) {
    console.error('Error during token verification:', error);

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Unauthorized - Token has expired.' });
    }

    return res.status(401).json({ error: 'Unauthorized - Invalid token.' });
  }
};

export default authenticateToken;



