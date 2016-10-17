module.exports = {

  getAllToDos: function(req, res, next) {
    res.send('Sending you all your todos!');
    next();
  },

  getToDo: function(req, res, next, gettodo) {
    res.send(`Sending todo with id: ${gettodo}`);
    next();
  },

  putToDo: function(req, res, next, puttodo) {
    res.send(`Updating todo with id: ${puttodo}`);
    next();
  }

}
