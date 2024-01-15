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

// reviews route
app.use('/api/v1/reviews', reviewsRouter)

// default route
app.get('*', (req, res) => {
  res.status(404).send('Check the route and try again!! 🔴')
})
module.exports = app;