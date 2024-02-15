const express = require('express');
const { getAllBookings, addBooking } = require('../controllers/bookingsController');
const { protect } = require('../controllers/authenticationController');

const router = express.Router();

router.route('/').get(protect, getAllBookings).post(protect, addBooking)

module.exports = router;