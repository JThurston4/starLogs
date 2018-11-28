let mongoose = require('mongoose')
let Schema = mongoose.Schema
let name = "Ship"

//Ship schema
let schema = new Schema({
  name: { type: String, required: true }
})

let model = mongoose.model(name, schema)

module.exports = model