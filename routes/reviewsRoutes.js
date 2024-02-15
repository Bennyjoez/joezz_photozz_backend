const express = require('express');
const { protect } = require('../controllers/authenticationController');

// controllers
const { getAllReviews, addReview } = require('../controllers/reviewsController');

const router = express.Router();

router.route('/').get(protect, getAllReviews).post(addReview);

module.exports = router;