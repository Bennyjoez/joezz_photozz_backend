const { promisify } = require('util');
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
    const {name, email, contact, password, passwordChangedAt } = req.body;
    const user = await User.create({ name, email, contact, password, passwordChangedAt });

    // create a token
    const token = signToken(user._id);

    const filteredUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact
    }

    res.status(201).json({
      status: 'Success',
      message: 'User registered!',
      token,
      user: filteredUser,
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

    const filteredUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact
    }
    // send successful response
    res.status(200).json({
      status: 'Success',
      token,
      user: filteredUser
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed to Login user",
      message: err.message,
    })
  }
}

const resetPassword = async (req, res) => {
  // find the said profile
  const user = await User.find({email: req.body.email});
  // send a code to said email
  
  // use sent code to login the first time

  // prompt the user to change the password to a desired password

  // save the new password
  console.log('called reset password', user)
  return res.status(201).json({
    status: 'Success',
    message: "Password Reset!"
  })
}

const protect = async (req, res, next) => {
  // get token and check if it is there
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if(!token) {
    return res.status(401).json({
      status: 'Fail',
      message: 'You are not logged in! Please log in to get access.'
    })
  }
  // verification of token
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // check if user still exists
    const freshUser = await User.findById(decoded.id);
    if(!freshUser) {
      return res.status(401).json({
        status: 'Unauthorized',
        error: {
          message: 'The user of this token no longer exists!'
        }
      })
    }

    // check if user changed password
    if(await freshUser.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        status: 'Unauthorized',
        error: {
          message: 'User recently changed the password. Please log in again!'
        }
      })
    };

    req.user = freshUser;
  } catch(err) {
    return res.status(401).json({
      status: 'Unauthorized',
      error: err
    })
  }

  // Grant access to protected router
  next();
}

module.exports = { registerUser, loginUser, resetPassword, protect };
