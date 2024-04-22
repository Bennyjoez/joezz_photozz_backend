const Booking = require("../models/bookingsModel");

const handleErrors = (err) => {
  let errors = {};

  if (err.message.includes("duplicate key error")) {
    errors = {
      code: err.code,
      message: `The date is already reserved. Choose a different date`,
    };
  }

  return errors;
};

const getAllBookings = async (req, res) => {
  try {
    // get all bookings with client data
    const bookings = await Booking.find().populate({
      path: "client",
      select: "name",
    });
    // SEND RESPONSE
    res.status(200).json({
      status: "Success",
      results: bookings.length,
      data: bookings,
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err.message,
    });
  }
};

const getBookingsById = async (req, res) => {
  try {
    const userId = req.params.id;
    // get all bookings for a given client
    const bookings = await Booking.find({ client: userId });
    // SEND RESPONSE
    res.status(200).json({
      status: "Success",
      results: bookings.length,
      data: bookings,
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err.message,
    });
  }
};

const addBooking = async (req, res) => {
  try {
    // create a booking
    const client = req.user._id;
    const booking = await Booking.create({ ...req.body, client });
    // SEND RESPONSE
    res.status(201).json({
      status: "Success",
      booking,
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(404).json({
      status: "Fail",
      errors,
    });
  }
};

const deleteBookingById = async (req, res) => {
  //TODO: Instead of deleting the booking, mark it as canceled or completed
  // - The user can cancel a booking using a button
  // - The user may/may not have access to the canceled bookings. Canceled bookings marked in red. completed bookings in green.
  // - An admin can see all bookings(active, canceled and completed)
  try {
    //  find the target
    const { id } = req.params;
    await Booking.findByIdAndDelete(id);
    const deleted = await Booking.findById(id);

    res.status(200).json({
      status: "Success",
      message: "Booking deleted!"
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getAllBookings, getBookingsById, addBooking, deleteBookingById };
