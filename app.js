import express from 'express';
import routes from './routes/routes.js';

const app = express();

app.use('/', routes);
app.use(express.static('public'));

app.set('view engine', 'ejs');


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});