const Review = require('../models/reviewsModel');

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    // SEND RESPONSE
    res.status(200).json({
      status: 'Success',
      results: reviews.length,
      data: reviews,
    });
  } catch (err) {
    console.log('Something went wrong');
    res.status(404).json({
      status: 'Fail',
      message: err.message
    }) 
  }
}

const addReview = async(req, res) => {
  try {
    // add a review

    // SEND RESPONSE
    res.status(201).json({
      status: 'Success',
      message: 'Review added'
    });
  } catch (err) {
    console.log('Something went wrong');
    res.status(404).json({
      status: 'Fail',
      message: err.message
    }) 
  }
}

module.exports = {
  getAllReviews,
  addReview
}
