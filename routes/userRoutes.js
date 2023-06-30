import express from 'express';
import { signinUser, signupUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.route('/signup')
    .get((req, res) => {
        res.render('signup', { message: '' });
        console.log('sent signup.ejs to client');
    })
    .post(signupUser);

userRouter.route('/signin')
    .get((req, res) => {
        res.render('signin', { message: '' });
        console.log('sent signin.ejs to client');
    })
    .post(signinUser);

userRouter.get('/profile', (req, res) => {
    res.render('profile');
    console.log('sent profile.ejs to client');
});

export default userRouter;