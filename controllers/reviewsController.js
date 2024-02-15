const Review = require('../models/reviewsModel');

const handleErrors = (err) => {
  let errors = {};

  if(err.message.includes('duplicate key error')) {
    console.log(err)
    errors = {
      code: err.code,
      message: `That ${Object.keys(err.keyValue)[0].toUpperCase()} is already taken`
    }
  }

  return errors;
} 

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
    console.log(req)
    // create a review
    const review = await Review.create(req.body);
    // SEND RESPONSE
    res.status(201).json({
      status: 'Success',
      message: review
    });
  } catch (err) {
    const errors = await handleErrors(err);
    res.status(404).json({
      status: 'Fail',
      errors
    }) 
  }
}

module.exports = {
  getAllReviews,
  addReview
}
