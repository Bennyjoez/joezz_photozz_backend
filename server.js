const dotenv = require('dotenv');
dotenv.config({path : './config.env'})
const app = require(`${__dirname}/app.js`)
const port = process.env.PORT
const mongoose = require('mongoose');

// connect app to database
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB)
  .then((result) => {
    console.log('DB connection successful');
    app.listen(port);
    console.log(`App listening on port ${port}`)
  })
  .catch((err) => console.log(err));