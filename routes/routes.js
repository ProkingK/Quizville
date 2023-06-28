import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('splash');
    console.log('sent splash.ejs to client');
});

router.get('/home', (req, res) => {
    res.render('home');
    console.log('sent home.ejs to client');
});

router.get('/quiz', (req, res) => {
    res.render('quiz');
    console.log('sent quiz.ejs to client');
});

export default router;