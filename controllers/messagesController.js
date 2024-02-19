// control all messages sent

const Message = require("../models/messageModel")

// handle errors
const handleErrors = (err) => {
  const fields = Object.keys(err.errors);
  const errors = {};
  if (err.name === 'ValidationError') {
    fields.forEach(er => {
      errors[er] = {
        name: err.errors[er].name,
        message: err.errors[er].message,
      }
    })
    return errors;
  }
  return err
}

// get all messages
const getAllMessages = async (req, res) => {
  res.status(201).json({
    status: 'Success',
    data: {
      message: 'Here are the messages'
    }
  })
}

// add message
const addMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: {
        message: message
      }
    })
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({
      status: 'Fail',
      errors
    }) 
  }
}

module.exports = { getAllMessages, addMessage };