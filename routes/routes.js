import express from 'express';

const router = express.Router();

const protectRoute = (req, res, next) => {
    if (req.session.isLoggedIn) {
        next();
    }
    else {
        res.render('signin', { message: 'Sign in to access the website' });
    }
};

router.get('/', (req, res) => {
    res.render('splash');
    console.log('sent splash.ejs to client');
});

router.get('/home', protectRoute, (req, res) => {
    res.render('home');
    console.log('sent home.ejs to client');
});

router.get('/quiz', protectRoute, (req, res) => {
    res.render('quiz');
    console.log('sent quiz.ejs to client');
});

export default router;