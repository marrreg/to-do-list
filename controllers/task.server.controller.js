var Task = require('../models/task.server.model.js');

exports.create = function(req, res) {
  console.log("Creating new task in db!");
  var entry = new Task({
    taskSummary: req.body.taskSummary,
    taskStatus: req.body.taskStatus,
    startTimestamp: req.body.startTimestamp,
    stopTimestamp: req.body.stopTimestamp,
    taskDuration: req.body.taskDuration,
    taskEstimate: req.body.taskEstimate
  })

  entry.save();
};
