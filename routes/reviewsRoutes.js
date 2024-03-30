const express = require('express');
const { protect } = require('../controllers/authenticationController');

// controllers
const { getAllReviews, addReview } = require('../controllers/reviewsController');

const router = express.Router();

router.route('/').get(getAllReviews).post(protect, addReview);

module.exports = router;