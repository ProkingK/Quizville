import express from 'express';
import userController from '../controllers/userController.js';

const userRouter = express.Router();

app.route('/signup')
    .get((req, res) => {
        res.render('signup');
        console.log('sent signup.ejs to client');
    })
    .post('/register', userController.signupUser);

userRouter.get('/login', (req, res) => {
    res.render('login');
    console.log('sent login.ejs to client');
});

userRouter.get('/profile', (req, res) => {
    res.render('profile');
    console.log('sent profile.ejs to client');
});

export default userRouter;