const mongoose = require('mongoose');
const { isEmail } = require('validator');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A name is needed!"],
  },
  password:{
    type: String,
    required: [true, "A password is necessary."],
    minlength: [6, 'Minimum password length is 6 characters']
  },
  email: {
    type: String,
    required: [true, 'An email is required'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  contact: {
    type: String, 
    required: [true, "A contact is needed"],
    unique: true,
  },
})

const User = mongoose.model("User", schema);

module.exports = User;