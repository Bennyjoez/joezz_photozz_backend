const Booking = require("../models/bookingsModel");

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    // SEND RESPONSE
    res.status(200).json({
      status: 'Success',
      results: bookings.length,
      data: bookings,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message
    }) 
  }
}

const addBooking = async (req, res) => {
  try {
    // create a booking
    const booking = await Booking.create(req.body);
    // SEND RESPONSE
    res.status(201).json({
      status: 'Success',
      message: booking
    });
  } catch (err) {
    console.log('Something went wrong');
    res.status(404).json({
      status: 'Fail',
      message: err.message
    }) 
  }
}

module.exports = { getAllBookings, addBooking }