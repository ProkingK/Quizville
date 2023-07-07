import dotenv from 'dotenv';
import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import routes from './routes/routes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
}));

app.use('/', routes);
app.use('/', userRoutes);
app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});