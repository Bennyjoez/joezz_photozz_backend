const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5173', // Change this to your React app's URL in production
  methods: 'GET,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //logs requests to the console e.g. GET /img/favicon.png 200 6.047 ms - 12789
}
// routes
const reviewsRouter = require('./routes/reviewsRoutes');
const authenticationRouter = require("./routes/authenticationRoutes");
const bookingsRouter = require('./routes/bookingsRoutes');

const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next()
}

app.use(requestTime);

app.use(express.json());

// reviews route
app.use('/api/v1/reviews', reviewsRouter);
// authentication route
app.use('/api/v1/users', authenticationRouter);
// bookings route
app.use('/api/v1/bookings', bookingsRouter);

// default route(post, get, put)
app.all('*', (req, res, next) => {
  console.log(req)
  res.status(404).json({
    status: 'Fail',
    message: `Cannot find ${req.originalUrl}. Check the route and try again!! 🔴`
  })
})

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;