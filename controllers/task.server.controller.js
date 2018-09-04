var Task = require('../models/task.server.model.js');

exports.create = function(req, res) {
  console.log("Starting to add task");
  var entry = new Task({
    summary: req.body.summary,
    status: req.body.status,
    startTimestamp: req.body.startTimestamp,
    stopTimestamp: req.body.stopTimestamp,
    duration: req.body.duration,
    estimate: req.body.estimate
  })

  console.log("Saving task");
  entry.save(() => { console.log("Task saved"); });
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

exports.delete = function(req, res) {
  Task.find({ _id: req.params.id }).remove().exec();
}
