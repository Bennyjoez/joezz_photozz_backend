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

}

module.exports = { getAllBookings, addBooking }