const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

schema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  let { password } = this;

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(password, salt);

  next()
}) 

const User = mongoose.model("User", schema);

module.exports = User;