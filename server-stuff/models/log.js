let mongoose = require('mongoose')
let Schema = mongoose.Schema
let name = "Log"
let ObjectId = Schema.Types.ObjectId

//Log schema
let schema = new Schema({
  author: { type: ObjectId, ref: 'User', required: true },
  shipId: { type: ObjectId, ref: 'Ship', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Number, default: Date.now(), required: true }
})

let model = mongoose.model(name, schema)

module.exports = model