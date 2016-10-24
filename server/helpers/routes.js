/*  @flow */

const handler = require('../helpers/request-handler.js');
const path = require('path');


function router(app) {
  // Routes
  //
  app.get('/', (req, res) => { res.sendFile(path.join(__dirname, '..', 'src', 'index.html')); });
  //
  // Get all todos by author
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
  // Get weather data
  app.get('/weather/:location', handler.getWeather);
  //
  // Get outta here!
  app.post('/*', (req, res) => { res.sendStatus(404); });
}

module.exports = router;
