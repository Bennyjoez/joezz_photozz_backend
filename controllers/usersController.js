const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const registerUser = async (req, res) => {
  try {
    let { email } = req.body;
    // check if user exists
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send({ error: 'User with specified email already exists!' });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const password = await bcrypt.hash(req.body.password, salt);
    const info = {...req.body, password};
    await User.create(info);

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


const loginUser = async (req, res) => {
  try {
    // verify login
    const userName = req.body.name;
    const { name, password} = await User.findOne().where('name').equals(userName);

    const compare = await bcrypt.compare(req.body.password, password);
    if(compare) {
      // No response for this
      res.status(204).send();
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "Fail",
      message: err.message,
    })
  }
}

module.exports = { registerUser, loginUser };
