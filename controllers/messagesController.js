// control all messages sent

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
  res.status(201).json({
    status: 'Success',
    data: {
      message: 'Here are the messages'
    }
  })
}

module.exports = { getAllMessages, addMessage };