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
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Bizpay</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: lightgreen;
            text-align: center;
            padding: 50px;
          }
        </style>
      </head>
      <body>
        <h1>Welcome to Bizpay backend application</h1>
        <p>This is a simple message to indicate that the server is running.</p>
      </body>
    </html>
  `);
});
app.listen(port, () => {
    console.log(`Server is Ok`);
});
