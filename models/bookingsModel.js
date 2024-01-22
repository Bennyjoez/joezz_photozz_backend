const mongoose = require('mongoose');
const User = require('./userModel');

const schema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  event: {
    type: String,
    required: [true, "Is it a wedding? What is it?"]
  },
  reservationDate: {
    type: Date,
    required: [true, "Need a date to reserve"],
    unique: true
  },
  shootLocation: {
    type: String,
    required: [true, "Where will we report for the event"]
  },
})

const Booking = mongoose.model('Booking', schema);

module.exports = Booking;