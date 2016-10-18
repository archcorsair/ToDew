const handler = require('./helpers/request-handler.js');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

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

// // //   Routes   // // //
//                        //
//    Send index.html     //
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'src', 'index.html'));
});
// Get all todos by author  //
app.get('/todos/author/:author', handler.getAllToDos);
//
// Get a single todo by id
app.get('/todos/:gettodo', handler.getToDo);
//
// Post a new todo
app.post('/todos', handler.postToDo);
//
// Update a todo by id
app.put('/todos/:puttodo', handler.putToDo);
//
// Delete a todo by id
app.delete('/todos/:deletetodo', handler.deleteToDo);
//
// Get outta here!
app.post('/*', (req, res) => { res.sendStatus(404); });
//
// Server starts
app.listen(3000, () => { console.log('Listening on port 3000'); });

module.exports = app;
