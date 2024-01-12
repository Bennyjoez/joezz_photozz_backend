const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'Success',
    message: 'Hello there from the server Benny!'
  });
})

module.exports = app;