"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const authenticateToken = (req, res, next) => {
    try {
        const authorizationHeader = req.header('Authorization');
        if (!authorizationHeader) {
            return res.status(401).json({ error: 'Unauthorized - No Authorization header provided.' });
        }
        const [bearer, token] = authorizationHeader.split(' ');
        if (!bearer || !token || bearer.toLowerCase() !== 'bearer') {
            return res.status(401).json({ error: 'Unauthorized - Invalid Authorization header format.' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.APP_SECRET);
        req.body.uniqueId = decoded.uniqueId;
        res.cookie('userId', decoded.uniqueId, { httpOnly: true, secure: true });
        next();
    }
    catch (error) {
        console.error('Error during token verification:', error);
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({ error: 'Unauthorized - Token has expired.' });
        }
        return res.status(401).json({ error: 'Unauthorized - Invalid token.' });
    }
};
exports.default = authenticateToken;
