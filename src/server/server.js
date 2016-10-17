const handler = require('./request-handler.js');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Replace Mongoose's outdated promise library
mongoose.Promise = Promise;
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/todewdev');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle params
app.param('gettodo', handler.getToDo);
app.param('puttodo', handler.putToDo);
app.param('deletetodo', handler.deleteToDo);

// // Routes // //
//
// Get all the todos
app.get('/todos', handler.getAllToDos);
//
// Get a single todo
app.get('/todos/:gettodo', handler.getToDo);
//
// Post a new todo
app.post('/todos', handler.postToDo);
//
// Update a todo
app.put('/todos/:puttodo', handler.putToDo);
//
// Delete a todo
app.delete('/todos/:deletetodo', handler.deleteToDo);
//
// Get outta here!
app.post('/*', (req, res) => { res.sendStatus(404); });
//
// Server starts
app.listen(3000, () => { console.log('Listening on port 3000'); });

module.exports = app;
