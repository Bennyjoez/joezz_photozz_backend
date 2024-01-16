const express = require('express');

// controllers
const { getAllReviews, addReview, getReview } = require('../controllers/reviewsController');

console.log(getAllReviews)

const router = express.Router();

router.route('/').get(getAllReviews).post(addReview);
router.route('/:id').get(getReview);

module.exports = router;