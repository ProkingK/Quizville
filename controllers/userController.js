import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

export const signupUser = async (req, res) => {
  try {
    const { name, surname, username, email, password} = req.body;

    let existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.render('signup', { message: 'Username already exists' });
    }

    existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.render('signup', { message: 'Email already exists' });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
    const requirements = 'Password should contain at least 6 characters, including one uppercase letter, one lowercase letter, and one digit.';

    if (!password.match(passwordRegex)) {
      return res.render('signup', { message: requirements });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      surname,
      username,
      email,
      password: hashedPassword,
      role : 'user'
    });

    User.create(user);

    res.redirect('/home');
    console.log('User signed up and redirected to home page');
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const signinUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.render('signin', { message: 'Username does not exits' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.render('signin', { message: 'Incorrect password' });
    }

    res.redirect('/home');
    console.log('User signed in and redirected to home page');
  }
  catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const checkUsernameAvailability = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });

    if (user) {
      res.json({ available: false });
    }
    else {
      res.json({ available: true });
    }

    console.log('username availability check requested');
  }
  catch (error) {
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
}

export const checkEmailAvailability = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      res.json({ available: false });
    }
    else {
      res.json({ available: true });
    }

    console.log('email availability check requested');
  }
  catch (error) {
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
}