import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import "dotenv/config"
import {connectDB} from './db/db';
import userLoginRoute from './middleware/index';
import userSignupRoute from './middleware/index';
import userCreateProfileRoute from './middleware/index';
import { renderHomePage } from './rootUrl';
import 'tailwindcss/dist/base.css'

connectDB()
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());


app.use('/', userLoginRoute);
app.use('/', userSignupRoute )
app.use('/', userCreateProfileRoute )

app.get('/', (_req, res) => {
  res.send(renderHomePage());
});

app.listen(port, () => {
  console.log(`Server is Ok`);
});

export default app;