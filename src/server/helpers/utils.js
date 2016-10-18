const mongoose = require('mongoose');
const ToDo = require('../models/todoModel.js');

mongoose.Promise = Promise;

module.exports = {

  doGetAllToDos: () => ToDo.find({}),

  doGetToDo: (gettodo) => {
    // Convert string id into mongoose ObjectId
    const currentId = new mongoose.Types.ObjectId(gettodo);
    return ToDo.findById({ _id: currentId });
  },

  doPutToDo: (gettodo, content) => {
    const currentId = new mongoose.Types.ObjectId(gettodo);
    return ToDo.findOneAndUpdate({ _id: currentId }, { content }, { new: true });
  },

  doPostToDo: newToDo => newToDo.save(),

  // Wrapped the return to satisfy linter :P
  validId: id => (id.length === 24 ? true : false),

};
