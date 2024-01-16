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

const getReview = async (req, res) => {
  try {
    const id = req.params
    const review = await Review.findById(req.params.id);

    // SEND RESPONSE
    res.status(201).json({
      status: 'Success',
      message: review,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message
    }) 
  }
}

const addReview = async(req, res) => {
  try {
    // create a review
    const review = await Review.create(req.body);
    // SEND RESPONSE
    res.status(201).json({
      status: 'Success',
      message: review
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
  getReview,
  addReview
}
