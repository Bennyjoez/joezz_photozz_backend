const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const registerUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    // check if user exists
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send({
        status: 'Failed to register user',
        message: 'User with specified email already exists!',
      });
    }
    // check the length of the password
    if (password.length < 6) {
      console.log(password)
      return res.status(400).json({
        status: 'Failed to register user',
        message: 'Password must be at least 6 characters long',
      });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const info = {...req.body, hashedPassword};
    await User.create(info);

    res.status(201).json({
      status: 'Success',
      message: 'User registered!',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'Failed to register user',
      message: err.message,
    });
  }
};


const loginUser = async (req, res) => {
  try {
    // verify login
    const userEmail = req.body.email;
    const {password} = await User.findOne().where('email').equals(userEmail);

    const compare = await bcrypt.compare(req.body.password, password);
    if(!compare) {
      // No response for this
      return res.status(400).send({ error: 'Check your email and password and try again!'});
    }
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed to Login user",
      message: err.message,
    })
  }
}

module.exports = { registerUser, loginUser };
