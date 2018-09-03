var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
  summary: String,
  status: String,
  startTimestamp: Date,
  stopTimestamp: Date,
  duration: Number,
  estimate: Number
})

module.exports = mongoose.model('Task', taskSchema);
