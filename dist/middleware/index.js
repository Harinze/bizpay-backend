"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const auth_1 = require("../controllers/auth");
const auth_2 = __importDefault(require("../authentication/auth"));
const router = express_1.default.Router();
router.post('/create-profile', user_1.checkExistingUser, user_1.createUserProfile);
router.post('/login', auth_2.default, auth_1.loginUser);
exports.default = router;
