const mongoose = require('mongoose');
const User = require('./userModel');
const schema = new mongoose.Schema({
  reviewer: {
    type: String,
  },
  comment: {
    type: String,
    required: [true, "A review comment is needed."],
    unique: false
  },
  rating: {
    type: String,
    default: 4.5,
    required: [true, "A rating would be nice."]
  },
  date: {
    type: Date, default: Date.now()
  },
})

const Review = mongoose.model('Review', schema);



module.exports = Review;