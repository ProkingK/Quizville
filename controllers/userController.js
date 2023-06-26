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