const ToDo = require('../models/todoModel.js');
const util = require('./utils.js');

module.exports = {

  getAllToDos: (req, res, next, author) => {
    // Response with author's todos
    util.doGetAllToDos(author).then((results) => {
      res.json(results);
    }, next);
  },

  getToDo: (req, res, next, gettodo) => {
    if (!util.validId(gettodo)) {
      res.send('Please supplse a valid id.');
    }
    util.doGetToDo(gettodo).then((results) => {
      res.json(results);
    }, next);
  },

  // Update a todo
  putToDo: (req, res, next, puttodo) => {
    if (!util.validId(puttodo) || !req.body.content) {
      res.send('Please supply a valid id and content.');
    }
    const content = req.body.content;
    util.doPutToDo(puttodo, content).then((results) => {
      res.json(results);
    }, next);
  },

  // Post a new todo
  postToDo: (req, res, next) => {
    // Create a new ToDo document for MonogoDB
    if (!req.body.content || !req.body.author) {
      res.send('Malformed To-Do. Try again');
    } else {
      const newToDo = new ToDo({
        content: req.body.content,
        author: req.body.author.toLowerCase(),
      });
      // Save ToDo to MonogoDB
      util.doPostToDo(newToDo).then((result) => {
        const message = result.content;
        // eslint-disable-next-line no-underscore-dangle
        const id = result._id;
        res.send(`You posted a note:\n"${message}"\nNote ID: ${id}`);
      }, next);
    }
  },

  // Delete a todo
  deleteToDo: (req, res, next, deletetodo) => {
    if (!util.validId(deletetodo)) {
      res.send('Please supply a valid id.');
    } else {
      util.doDeleteToDo(deletetodo).then(() => {
        res.send('Your note has been deleted');
      }, next);
    }
  },

};
