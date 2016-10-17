const mongoose = require('mongoose');
const ToDo = require('../models/todoModel.js');

mongoose.Promise = Promise;

module.exports = {

  doGetAllToDos: () => ToDo.find({}),

  doPostToDo: newToDo => newToDo.save(),

};
