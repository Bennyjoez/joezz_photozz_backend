const getAllReviews = async (req, res) => {
  try {

    // SEND RESPONSE
    res.status(200).json({
      status: 'Success',
      message: 'Reviews retrieved'
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
