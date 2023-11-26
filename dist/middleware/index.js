"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const auth_1 = __importDefault(require("../authentication/auth"));
const router = express_1.default.Router();
router.post('/createclient', auth_1.default, user_1.createClientProfile);
router.post('/login', user_1.userLogin);
router.post('/signup', user_1.userSignup);
exports.default = router;
