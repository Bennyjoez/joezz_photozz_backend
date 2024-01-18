const express = require('express');
const { getAllBookings, addBooking } = require('../controllers/bookingsController');

const router = express.router();

router.route('/').get(getAllBookings).post(addBooking)

module.exports = router;