const express = require('express');

// controllers
const { getAllMessages, addMessage } = require("../controllers/messagesController");

const router = express.Router();

router.route('/').get(getAllMessages).post(addMessage);

module.exports = router;