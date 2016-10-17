const ToDo = require('../models/todoModel.js');
const util = require('./utils.js');


module.exports = {

  getAllToDos: (req, res, next) => {
    // Response with everything in the DB
    util.doGetAllToDos().then((results) => {
      res.json(results);
    }, next);
  },

  getToDo: (req, res, next, gettodo) => {
    res.send(`Sending todo with id: ${gettodo}`);
    next();
  },

  putToDo: (req, res, next, puttodo) => {
    res.send(`Updating todo with id: ${puttodo}`);
    next();
  },

  postToDo: (req, res, next) => {
    // Create a new ToDo document for MonogoDB
    if (!req.body.content || !req.body.author) {
      res.send('Malformed To-Do. Try again');
    } else {
      const newToDo = new ToDo({
        content: req.body.content,
        author: req.body.author,
      });
      // Save ToDo to MonogoDB
      util.doPostToDo(newToDo).then(() => {
        res.sendStatus(201);
      }, next);
    }
  },

  deleteToDo: (req, res, next, deletetodo) => {
    res.send(`Deleting todo with id: ${deletetodo}`);
    next();
  },

};
