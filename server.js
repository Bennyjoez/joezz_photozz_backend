const dotenv = require('dotenv');
dotenv.config({path : './config.env'})
const app = require(`${__dirname}/app.js`)
const port = process.env.PORT
const mongoose = require('mongoose');

// connect app to database
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

connect();

async function connect() {
  try {
    await mongoose.connect(DB); // await is used because auth is enabled
    console.log('DB connection successful');
  } catch (err) {
    console.log()
  }
}

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})