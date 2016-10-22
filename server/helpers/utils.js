const mongoose = require('mongoose');
const request = require('request-promise');
const config = require('../config.js');
const ToDo = require('../models/todoModel.js');

mongoose.Promise = Promise;

module.exports = {

  doGetAllToDos: author => ToDo.find({}).where('author').equals(author.toLowerCase()).select('-__v'),

  doGetToDo: (gettodo) => {
    // Convert stringified ID to Mongoose ObjectId
    const currentId = new mongoose.Types.ObjectId(gettodo);
    return ToDo.findById({ _id: currentId }).select('-__v');
  },

  doPutToDo: (gettodo, content) => {
    const currentId = new mongoose.Types.ObjectId(gettodo);
    return ToDo.findOneAndUpdate({ _id: currentId }, { content }, { new: true }).select('-__v');
  },

  doPostToDo: newToDo => newToDo.save(),

  doDeleteToDo: (deletetodo) => {
    const currentId = new mongoose.Types.ObjectId(deletetodo);
    return ToDo.findById({ _id: currentId }).remove();
  },

  doGetWeather: (lat, long) => request(`https://api.darksky.net/forecast/${config.apiKey}/${lat},${long}`),

  validId: id => (id.length === 24 ? true : false),

};
