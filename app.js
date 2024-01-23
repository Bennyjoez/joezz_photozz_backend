const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //logs requests to the console e.g. GET /img/favicon.png 200 6.047 ms - 12789
}
// routes
const reviewsRouter = require('./routes/reviewsRoutes');
const authenticationRouter = require("./routes/authenticationRoutes");
const bookingsRouter = require('./routes/bookingsRoutes');

const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)
app.use(cors());

app.use(express.json());

// reviews route
app.use('/api/v1/reviews', reviewsRouter);
app.use('/api/v1/users', authenticationRouter);
app.use('/api/v1/bookings', bookingsRouter);

// default route
app.get('*', (req, res) => {
  res.status(404).send('Check the route and try again!! 🔴')
})
module.exports = app;