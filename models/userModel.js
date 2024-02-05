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
    minlength: [6, 'Minimum password length is 6 characters'],
    select: false
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

  this.password = await bcrypt.hash(password, 12);

  next()
}) 

schema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model("User", schema);

module.exports = User;