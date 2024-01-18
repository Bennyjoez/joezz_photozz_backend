const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, "A client's name is needed"]
  },
  email: {
    type: String,
    required: [true, 'A correspondence email is needed']
  },
  contact: {
    type: String, 
    required: [true, "A contact is needed"],
    unique: true,
  },
  event: {
    type: String,
    required: [true, "Is it a wedding? What is it?"]
  },
  location: {
    type: String,
    required: [true, "Where will we report for the event"]
  },
  reservationDate: {
    type: Date,
    required: [true, "Need a date to reserve"],
    unique: true
  }
})

const Booking = mongoose.model('Booking', schema);

module.exports = Booking;