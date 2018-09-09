var Task = require('../models/task.server.model.js');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

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
  entry.save((err) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send();
    }
  })
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
  // Task.find({ _id: req.params.id }).remove().exec();
  Task.deleteOne({ _id: ObjectId(req.params.id) }, (err) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      console.log("Task deleted!");
      return res.status(200).send();
    }
  });
};

exports.getOne = function(req, res) {
  Task.findById(req.params.id, (err, obj) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(obj);
    }
  });
}
