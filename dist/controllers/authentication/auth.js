"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - No token provided.' });
    }
    jsonwebtoken_1.default.verify(token, `${process.env.APP_SECRET}`, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token.' });
        }
        // Attach the decoded token payload to the request for further use
        req.body.userId = decoded.userId; // Assuming userId is present in the token payload
        next();
    });
};
exports.default = authenticateToken;
