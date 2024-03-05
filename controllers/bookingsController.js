const Booking = require("../models/bookingsModel");

const handleErrors = (err) => {
  let errors = {};

  if(err.message.includes('duplicate key error')) {
    errors = {
      code: err.code,
      message: `The date is already reserved. Choose a different date`
    }
  }

  return errors;
} 

const getAllBookings = async (req, res) => {
  try {
    // get all bookings with client data
    const bookings = await Booking.find().populate({ 
      path: 'client',
      select: 'name'
    });
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

const getBookingsById = async (req, res) => {
  try {
    const userId = req.params.id;
    // get all bookings for a give Id
    const bookings = await Booking.find().where('client').equals(userId);
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
    const errors = handleErrors(err);
    res.status(404).json({
      status: 'Fail',
      errors
    })
  }
}

module.exports = { getAllBookings, getBookingsById, addBooking }