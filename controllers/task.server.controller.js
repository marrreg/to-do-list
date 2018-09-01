var Task = require('../models/task.server.model.js');

exports.create = function(req, res) {
  var entry = new Task({
    taskStatus: req.body.taskStatus,
    startTimestamp: req.body.startTimestamp,
    stopTimestamp: req.body.stopTimestamp,
    taskDuration: req.body.taskDuration,
    taskEstimate: req.body.taskEstimate
  })

  entry.save();

  res.redirect(301, '/');
};

