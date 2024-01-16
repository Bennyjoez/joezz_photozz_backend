const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is needed for a review!']
  },
  date: {type: Date, default: Date.now()},
  comment: String,
})

const Review = mongoose.model('Review', schema);



module.exports = Review;