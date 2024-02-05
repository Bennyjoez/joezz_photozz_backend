const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

const signToken = (data) => {
  return jwt.sign({ id: data}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

const registerUser = async (req, res) => {
  try {
    const {name, email, contact, password} = req.body;
    const user = await User.create({ name, email, contact, password });

    // create a token
    const token = signToken(user._id);

    res.status(201).json({
      status: 'Success',
      token,
      data: { user },
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
    const { email, password } = req.body;
    if ( !email || !password ) {
      return res.status(400).send({
        status: 'Failed to login user',
        error: {
          message: "Please provide email and password!"
        } 
      });
    }

    // const user = await User.findOne().where('email').equals(email);
    const user = await User.findOne({ email }).select('+password');
    
    if(!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).send({
        status: 'Failed to login user',
        error: {
          message: 'Incorrect email or password!'
        }
      });
    }

    const token = signToken(user._id);
    // send successful response
    res.status(200).json({
      status: 'Success',
      token
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed to Login user",
      message: err.message,
    })
  }
}

module.exports = { registerUser, loginUser };
