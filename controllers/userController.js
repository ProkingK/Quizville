import User from '../models/userModel.js';

export const signupUser = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password, role } = req.body;

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
      firstname,
      lastname,
      username,
      email,
      hashedPassword,
      role
    });

    User.create(user);

    res.redirect('/home');
    console.log('User signed up and redirected to home page');
  }
  catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

















export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user.password === password) {
    res.redirect('/home');
    console.log('User logged in and redirected to home page');
  }
};