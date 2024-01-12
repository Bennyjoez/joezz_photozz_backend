const app = require(`${__dirname}/app.js`)
const port = 3001;

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})