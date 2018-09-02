var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
  taskSummary: String,
  taskStatus: String,
  startTimestamp: Date,
  stopTimestamp: Date,
  taskDuration: Number,
  taskEstimate: Number
})

module.exports = mongoose.model('Task', taskSchema);
