const express = require('express');
const path = require('path');
const log = require('fancy-log');

const app = express();
const port = process.env.PORT || 3110;

app.use(express.static(path.join(__dirname, '/dist')));

app.listen(port, () => log('Server Started'));
