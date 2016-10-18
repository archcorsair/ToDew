const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
  content: String,
  author: String,
  created: { type: Date, default: Date.now },
});

const ToDo = mongoose.model('ToDo', ToDoSchema);

module.exports = ToDo;
