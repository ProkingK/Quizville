import express from 'express';
import { loginUser, signupUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.route('/signup')
    .get((req, res) => {
        res.render('signup', { message: '' });
        console.log('sent signup.ejs to client');
    })
    .post(signupUser);

userRouter.route('/login')
    .get((req, res) => {
        res.render('login', { message: '' });
        console.log('sent login.ejs to client');
    })
    .post(loginUser);

userRouter.get('/profile', (req, res) => {
    res.render('profile');
    console.log('sent profile.ejs to client');
});

export default userRouter;