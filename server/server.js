const handler = require('./helpers/request-handler.js');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const router = require('./helpers/routes');
const Redis = require('redisng');

function getInstance(port = 3000) {
  const promises = [];
  // Connect to Redis Server
  const redis = new Redis();
  promises.push(redis.connect());

  // Replace Mongoose's outdated promise library
  mongoose.Promise = Promise;
  const app = express();

  // Connect to MongoDB
  mongoose.connect('mongodb://localhost/todewdev');

  // Middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/', express.static(path.join(__dirname, '..', 'src')));

  // Handle params
  app.param('gettodo', handler.getToDo);
  app.param('puttodo', handler.putToDo);
  app.param('deletetodo', handler.deleteToDo);
  app.param('author', handler.getAllToDos);
  app.param('location', handler.getWeather);

  // Routes
  router(app);

  let httpServer;
  promises.push(new Promise((resolve, reject) => {
    httpServer = app.listen(port, resolve);
    setTimeout(reject, 1000);
  }));

  app.close = () => {
    httpServer.close();
    redis.close();
  };

  return Promise.all(promises).then(() => app);
}

module.exports = getInstance;
