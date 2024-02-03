const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const handleErrors = (err) => {
  let errors = {};

  if(err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      // errors[properties.path] = properties.message
      errors.message = properties.message
    })
  } else if(err.message.includes('duplicate key error')) {
    console.log(err)
    errors = {
      code: err.code,
      message: `That ${Object.keys(err.keyValue)[0].toUpperCase()} is already taken`
    }
  }

  return errors;
} 

const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.cookie('user', true);

    res.status(201).json({
      status: 'Success',
      message: 'User registered!',
    });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.status(500).json({
      status: 'Failed to register user',
      errors,
    });
  }
};


const loginUser = async (req, res) => {
  try {
    // verify login
    const userEmail = req.body.email.toLowerCase();
    const user = await User.findOne().where('email').equals(userEmail);
    
    if ( !user ) {
      return res.status(400).send({
        status: 'Failed to login user',
        error: {
          message: `This email(${userEmail}) is not recognized`
        } 
      });
    }
    const { password } = user;

    const compare = await bcrypt.compare(req.body.password, password);
    if(!compare) {
      return res.status(400).send({
        status: 'Failed to login user',
        error: {
          message: 'Check your password and try again!'
        }
      });
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
