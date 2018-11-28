let mongoose = require('mongoose')
const connectionString = 'mongodb://user1:hunter2@ds038888.mlab.com:38888/starlogs'
let connection = mongoose.connection
mongoose.connect(connectionString, {
  useNewUrlParser: true
})
connection.on('error', err => {
  console.log("DATABASE ERROR: ", err)
})
connection.once('open', () => {
  console.log("Connected to Database")
})