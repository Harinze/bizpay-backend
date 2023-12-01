"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientProfile = exports.userSignup = exports.userLogin = void 0;
const user_1 = __importDefault(require("../model/user"));
const helperFunctions_1 = require("../helperFunctions");
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = __importDefault(require("../model/client"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('maxTimeMS', 60000);
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, phoneNumber } = req.body;
        if (!email || !phoneNumber || !password) {
            return res.status(400).json({ message: 'Email, phone number, and password are required.' });
        }
        const lowercasedEmail = email.toLowerCase();
        const user = yield user_1.default.findOne({ email: lowercasedEmail, phoneNumber });
        if (!user) {
            return res.status(404).json({ message: 'User not found or invalid credentials.' });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        const token = (0, helperFunctions_1.generateToken)(user._id);
        res.status(200).json({ token, userId: user._id, message: 'You have logged in...' });
    }
    catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.userLogin = userLogin;
const userSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, password, phoneNumber, businessName, descriptionOfBusiness, address, image } = req.body;
        if (!fullName || !email || !password || !phoneNumber) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const lowercasedEmail = email.toLowerCase();
        const existingUserByEmail = yield user_1.default.findOne({ email: lowercasedEmail });
        const existingUserByPhoneNumber = yield user_1.default.findOne({ phoneNumber });
        if (existingUserByEmail) {
            return res.status(400).json({ message: 'Email is already registered.' });
        }
        if (existingUserByPhoneNumber) {
            return res.status(400).json({ message: 'Phone number is already registered.' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new user_1.default({
            fullName,
            email: lowercasedEmail,
            password: hashedPassword,
            phoneNumber,
            businessName,
            descriptionOfBusiness,
            address,
            image
        });
        const savedUser = yield newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: savedUser });
    }
    catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.userSignup = userSignup;
const createClientProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, businessName, businessNumber, phoneNumber, address, uniqueId, amount, date, status, invoiceName, invoiceDate, invoiceNumber, paymentConfirmation, totalOverduePayment, profile, } = req.body;
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
        const lowercasedEmail = email.toLowerCase();
        const existingProfile = yield client_1.default.findOne({
            $or: [
                { email: lowercasedEmail },
                { businessNumber },
                { amount },
                { uniqueId },
            ],
        });
        if (existingProfile) {
            return res.status(400).json({ message: 'Client profile with the provided details already exists.' });
        }
        const newClientProfile = new client_1.default({
            fullName,
            email: lowercasedEmail,
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
        const savedClientProfile = yield newClientProfile.save();
        res.status(201).json({ message: 'Client profile created successfully', profile: savedClientProfile });
    }
    catch (error) {
        console.error('Error during client profile creation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createClientProfile = createClientProfile;
