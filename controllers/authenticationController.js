const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const registerUser = async (req, res) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const password = await bcrypt.hash(req.body.password, salt);
    const name = req.body.name;

    await User.create({ name, password });

    res.status(201).json({
      status: 'Success',
      message: 'User registered!',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'Failed to register user',
      message: err,
    });
  }
};

module.exports = { registerUser };
