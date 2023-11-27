"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
        required: false
    },
    descriptionOfBusiness: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
}, { timestamps: true });
const UserProfileModel = mongoose_1.default.model('UserProfile', userSchema);
exports.default = UserProfileModel;
