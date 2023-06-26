import express from 'express';

const userRouter = express.Router();

userRouter.get('/signup', (req, res) => {
    res.render('signup');
    console.log('sent signup.ejs to client');
});

userRouter.get('/login', (req, res) => {
    res.render('login');
    console.log('sent login.ejs to client');
});

userRouter.get('/profile', (req, res) => {
    res.render('profile');
    console.log('sent profile.ejs to client');
});

export default userRouter;