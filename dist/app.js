"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
const db_1 = __importDefault(require("./db/db"));
(0, db_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT;
// Middleware
app.use((0, cors_1.default)()); // Enable CORS for all routes
app.use(body_parser_1.default.json()); // Parse JSON requests
// Routes
app.get('/', (_req, res) => {
    res.send('Hello, World!');
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
