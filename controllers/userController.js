import User from '../models/userModel.js';

// Controller function to register a new user
exports.registerUser = (req, res) => {
  const { username, email, password } = req.body;

  // Create a new user object
  const user = new User({
    username,
    email,
    password
  });

  // Save the user to the database
  User.create(user);

  // Redirect to the login page or display a success message
  res.redirect('/login');
};