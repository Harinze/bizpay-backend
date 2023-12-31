"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, `${process.env.APP_SECRET}`, { expiresIn: '7d' });
};
exports.generateToken = generateToken;
const decodeToken = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.APP_SECRET);
};
exports.decodeToken = decodeToken;
