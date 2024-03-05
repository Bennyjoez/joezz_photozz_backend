const express = require('express');
const { getAllBookings, addBooking, getBookingsById } = require('../controllers/bookingsController');
const { protect } = require('../controllers/authenticationController');

const router = express.Router();

router.route('/').get(protect, getAllBookings).post(protect, addBooking)
router.route('/:id').get(protect, getBookingsById);

module.exports = router;