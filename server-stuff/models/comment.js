let mongoose = require('mongoose')
let Schema = mongoose.Schema
let name = "Comment"
let ObjectId = Schema.Types.ObjectId

//Comment schema
let schema = new Schema({
  author: { type: ObjectId, ref: 'User' },
  logId: { type: ObjectId, ref: 'Log' },
  description: { type: String, required: true },
  date: { type: Number, default: Date.now(), required: true }
})

let model = mongoose.model(name, schema)

module.exports = model