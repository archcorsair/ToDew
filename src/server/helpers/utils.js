const mongoose = require('mongoose');
const ToDo = require('../models/todoModel.js');

mongoose.Promise = Promise;

module.exports = {

  doGetAllToDos: () => ToDo.find({}),

  doGetToDo: currentId => ToDo.findById({ _id: currentId }),

  doPostToDo: newToDo => newToDo.save(),

};
