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
exports.createUserProfile = exports.checkExistingUser = void 0;
const user_1 = __importDefault(require("../model/user"));
const helperFunctions_1 = require("../helperFunctions");
const checkExistingUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, businessName, phoneNumber, uniqueId } = req.body;
        const existingUser = yield user_1.default.findOne({
            $or: [
                { email },
                { businessName },
                { phoneNumber },
                { uniqueId },
            ],
        });
        if (existingUser) {
            return res.status(400).json({ error: 'User with the provided details already exists.' });
        }
        next();
    }
    catch (error) {
        console.error('Error checking existing user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.checkExistingUser = checkExistingUser;
const createUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userProfileData = req.body;
        const userProfile = new user_1.default(userProfileData);
        const savedProfile = yield userProfile.save();
        if (savedProfile) {
            const token = (0, helperFunctions_1.generateToken)(savedProfile.uniqueId, savedProfile.email);
            res.status(200).send({
                message: `profile for ${savedProfile.businessName} has been created`,
                data: savedProfile,
                token
            });
            res.cookie('userId', savedProfile._id, { httpOnly: true, secure: true });
        }
        else {
            res.status(500).json({ error: 'Error generating token' });
        }
    }
    catch (error) {
        console.error('Error creating user profile:', error);
        res.status(500).json({ error: 'Error creating user profile' });
    }
});
exports.createUserProfile = createUserProfile;
