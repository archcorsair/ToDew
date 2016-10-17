const handler = require('./request-handler.js');
const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
const app = express();


app.param('gettodo', handler.getToDo);

app.param('puttodo', handler.putToDo);

app.get('/todos', handler.getAllToDos);

app.get('/todos/:gettodo', (req, res) => {
  res.end();
});

app.post('/todos', (req, res) => {
  res.send('Posting a new todo!');
});

app.put('/todos/:puttodo', (req, res) => {
  res.end();
});

// app.delete('/todos/:deltodo', )

app.post('/*', (req, res) => {
  res.send('Erorr 404: Cannot POST');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

module.exports = app;
