import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import "dotenv/config"
import connectDB from './db/db';

connectDB()
const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON requests

// Routes
app.get('/', (_req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});