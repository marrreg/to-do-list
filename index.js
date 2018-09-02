const express = require('express');
const path = require('path');

const app = express();

const port = 4000;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log("Server started on port 3000..."));
