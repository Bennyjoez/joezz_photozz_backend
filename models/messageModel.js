const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email."],
  },
  message: {
    type: String,
    required: [true, "Please provide the message."],
  },
  date: {type: Date, default: Date.now()},
})

const Message = mongoose.model('Message', schema);



module.exports = Message;