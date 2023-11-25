"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const industryTypes = ['Food and Beverages', 'Technology', 'Agriculture', 'Education'];
const userSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    businessName: {
        type: String,
        required: true
    },
    businessNumber: {
        type: String,
        required: true
    },
    industryType: {
        type: String,
        enum: industryTypes,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    uniqueId: {
        type: String,
        unique: true
    }
});
const UserProfileModel = mongoose_1.default.model('UserProfileModel', userSchema);
exports.default = UserProfileModel;
