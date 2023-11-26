"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
const db_1 = require("./db/db");
const index_1 = __importDefault(require("./middleware/index"));
(0, db_1.connectDB)();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/signup', index_1.default);
app.use('/login', index_1.default);
app.use('/createclientprofile', index_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
