const mongoose = require('mongoose');
const { isEmail } = require('validator');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email."],
    validate: [isEmail, 'Please enter a valid email'],
  },
  message: {
    type: String,
    required: [true, "Please provide the message."],
  },
  date: {type: Date, default: Date.now()},
})

const Message = mongoose.model('Message', schema);



module.exports = Message;