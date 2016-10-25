const handler = require('./helpers/request-handler.js');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const router = require('./helpers/routes');
const Redis = require('redisng');

// Connect to Redis Server
const redis = new Redis();
redis.connect().catch((e) => { console.log('Redis Connection Error: ', e); });

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

app.listen(3000, () => { console.log('Listening on port 3000'); });

module.exports = app;
