const express = require('express');
const app = express();

// routes
const reviewsRouter = require('./routes/reviewsRoutes');

const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)

app.use(express.json());

// app.get('/', (req, res) => {
//   res.status(200).json({
//     status: 'Success',
//     message: 'Hello there from the server Benny!'
//   });
// })

app.use('/api/v1/reviews', reviewsRouter)

module.exports = app;