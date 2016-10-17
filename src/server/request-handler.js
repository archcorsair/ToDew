module.exports = {

  getAllToDos: (req, res, next) => {
    res.send('Sending you all your todos!');
    next();
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
    res.send('Saving new todo!');
    next();
  },

  deleteToDo: (req, res, next, deletetodo) => {
    res.send(`Deleting todo with id: ${deletetodo}`);
    next();
  },

};
