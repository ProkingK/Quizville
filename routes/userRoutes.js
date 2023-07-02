import express from 'express';
import * as userController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.route('/signup')
    .get((req, res) => {
        res.render('signup', { message: '' });
        console.log('sent signup.ejs to client');
    })
    .post(userController.signupUser);

userRouter.route('/signin')
    .get((req, res) => {
        res.render('signin', { message: '' });
        console.log('sent signin.ejs to client');
    })
    .post(userController.signinUser);

userRouter.post('/check-username-availability', userController.checkUsernameAvailability);

userRouter.post('/check-email-availability', userController.checkEmailAvailability);

userRouter.get('/profile', (req, res) => {
    res.render('profile');
    console.log('sent profile.ejs to client');
});

export default userRouter;