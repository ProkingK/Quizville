import User from '../models/userModel.js';

export const signupUser = (req, res) => {
  const { firstname, lastname, username, email, password, role } = req.body;

  const user = new User({
    firstname,
    lastname,
    username,
    email,
    password,
    role
  });

  User.create(user);

  res.redirect('/home');
  console.log('User signed up and redirected to home page');
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user.password === password) {
    res.redirect('/home');
    console.log('User signed up and redirected to home page');
  }
};