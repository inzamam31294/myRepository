// const http = require("http");
const express = require('express');
const app = express();
require('mongoose');
const bodyparser = require('body-parser');
const morgan = require('morgan');
require('express-async-errors');

// database connection
require('./mongo');

// Models
require('./Model/Post');
require('./Model/Comments');

// Middleware
app.use(bodyparser.json()).use(morgan());

// Routes
app.use('/posts', require('./Routes/posts'));

// Route not found
app.use(function(req, res, next) {
  req.status = 404;
  const error = new Error('Routes not found');
  next(error);
});

if (app.get('env') === 'production') {
  app.use(function(error, req, res, next) {
    res.status(req.status || 500).send({
      message: error.message,
    });
  });
}
// error handler
app.use( function(error, req, res, next) {
  res.status(req.status || 500).send({
    message: error.message,
    stack: error.stack,
  });
});


app.listen(7272, function() {
  console.log('server is running on port 7272');
});
