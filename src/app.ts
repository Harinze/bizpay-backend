import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import "dotenv/config"
import {connectDB} from './db/db';
import userProfileRoutes from './middleware/index';

connectDB()
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());


app.use('/signup', userProfileRoutes);
app.use('/login', userProfileRoutes )
app.use('/createclientprofile', userProfileRoutes )

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
