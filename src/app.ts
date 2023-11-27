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

app.listen(port, () => {
  console.log(`Server is Ok`);
});
