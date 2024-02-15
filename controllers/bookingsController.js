const Booking = require("../models/bookingsModel");

const getAllBookings = async (req, res) => {
  try {
    // get all bookings with client data
    const bookings = await Booking.find().populate('client');
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
    const client = req.user._id;
    const booking = await Booking.create({ ...req.body, client});
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