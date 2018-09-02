var Task = require('../models/task.server.model.js');

exports.create = function(req, res) {
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

exports.getAll = function(req, res) {
  Task.find((err, tasks) =>  {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(tasks);
    }
  });
};
