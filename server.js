const dotenv = require('dotenv');
dotenv.config({path : './config.env'})
const app = require(`${__dirname}/app.js`)
const port = process.env.PORT

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})