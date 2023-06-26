import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import routes from './routes/routes.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/', routes);
app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});