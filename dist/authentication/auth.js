"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const helperFunctions_1 = require("../helperFunctions");
const authenticateToken = (req, res, next) => {
    try {
        const authorizationHeader = req.header('Authorization');
        if (!authorizationHeader) {
            return res.status(401).json({ message: 'Unauthorized - No Authorization header provided.' });
        }
        const [bearer, token] = authorizationHeader.split(' ');
        if (!bearer || !token || bearer.toLowerCase() !== 'bearer') {
            return res.status(401).json({ message: 'Unauthorized - Invalid Authorization header format.' });
        }
        const decoded = (0, helperFunctions_1.decodeToken)(token);
        req.body.userId = decoded.userId;
        res.cookie('userId', decoded.userId, { httpOnly: true, secure: true });
        next();
    }
    catch (error) {
        console.error('Error during token verification:', error);
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({ message: 'Unauthorized - Token has expired.' });
        }
        return res.status(401).json({ message: 'Unauthorized - Invalid token.' });
    }
};
exports.default = authenticateToken;
