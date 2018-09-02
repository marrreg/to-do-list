const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const mongopwd = require(path.join(__dirname, 'mongopwd.js'));

mongoose.connect(`mongodb+srv://tddb-admin:${mongopwd}@tooodoo-db-04nm5.mongodb.net/test?retryWrites=true`)

const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log("Server started on port 3000..."));
