import ejs from 'ejs';
import path from 'path';
import express from 'express';

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('splash');
  console.log('sent splash.ejs to client');
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});