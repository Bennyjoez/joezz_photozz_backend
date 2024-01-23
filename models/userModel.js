const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A name is needed!"],
  },
  password:{
    type: String,
    required: [true, "A password is necessary."]
  },
  email: {
    type: String,
    required: [true, 'A correspondence email is needed'],
    unique: true
  },
  contact: {
    type: String, 
    required: [true, "A contact is needed"],
    unique: true,
  },
})

const User = mongoose.model("User", schema);

module.exports = User;