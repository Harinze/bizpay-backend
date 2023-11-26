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
exports.loginUser = void 0;
const user_1 = __importDefault(require("../model/user"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, uniqueId, fullName, phoneNumber } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        // if (user.uniqueId === undefined || user.uniqueId === null) {
        //   return res.status(500).json({ error: 'User uniqueId is missing.' });
        // }
        //const token = generateToken(user.email, user.uniqueId);
        res.status(200).send({ message: `${user.fullName} is logged in successfully`, userId: user._id, user });
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Error during login.' });
    }
});
exports.loginUser = loginUser;
