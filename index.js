const express = require('express');
const path = require('path');
const taskCtrl = require('./controllers/task.server.controller.js');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongopwd = require('./mongopwd.js'); // May need to replace with the one in the bottom, if problems with imports arise
// const mongopwd = require(path.join(__dirname, 'mongopwd.js'));

mongoose.connect(`mongodb+srv://tddb-admin:${mongopwd}@tooodoo-db-04nm5.mongodb.net/test?retryWrites=true`)

const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  app.render('index.html');
})

app.post('/task', function(req, res) {
  console.log("Got POST!");
  return taskCtrl.create(req, res);
});

app.get('/tasks', function(req, res) {
  console.log("Got GET!");
  return taskCtrl.getAll(req, res);
});

app.listen(port, () => console.log("Server started on port 3000..."));
