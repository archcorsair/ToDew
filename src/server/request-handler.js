const mongoose = require('mongoose');
const ToDo = require('./todoModel');

mongoose.Promise = Promise;

module.exports = {

  getAllToDos: (req, res) => {
    // Response with everything in the DB
    ToDo.find({}).then((results) => {
      res.json(results);
    });
  },

  getToDo: (req, res, next, gettodo) => {
    res.send(`Sending todo with id: ${gettodo}`);
    next();
  },

  putToDo: (req, res, next, puttodo) => {
    res.send(`Updating todo with id: ${puttodo}`);
    next();
  },

  postToDo: (req, res) => {
    // Create a new ToDo document for MonogoDB
    if (!req.body.content && !req.body.author) {
      res.send('Bad Todo Provided. Try again');
    } else {
      const newToDo = new ToDo({
        content: req.body.content,
        author: req.body.author,
      });
      // Save ToDo to MonogoDB
      newToDo.save().then(() => {
        res.sendStatus(201);
      });
    }
  },

  deleteToDo: (req, res, next, deletetodo) => {
    res.send(`Deleting todo with id: ${deletetodo}`);
    next();
  },

};
