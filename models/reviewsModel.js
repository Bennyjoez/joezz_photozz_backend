const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'A name is needed for a review!']
  },
  comment: {
    type: String,
    required: [true, "A review comment is needed."]
  },
  rating: {
    type: Number,
    default: 4.5,
    required: [true, "A rating would be nice."]
  },
  date: {type: Date, default: Date.now()},
})

const Review = mongoose.model('Review', schema);



module.exports = Review;