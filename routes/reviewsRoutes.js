const express = require('express');

// controllers
const { getAllReviews, addReview } = require('../controllers/reviewsController');

console.log(getAllReviews)

const router = express.Router();

router.route('/').get(getAllReviews).post(addReview)

module.exports = router;