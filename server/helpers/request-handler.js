const ToDo = require('../models/todoModel.js');
const util = require('./utils.js');

module.exports = {

  getAllToDos: (req, res, next, author) => {
    util.doGetAllToDos(author).then((results) => {
      res.json(results);
    }, next);
  },

  getToDo: (req, res, next, gettodo) => {
    if (!util.validId(gettodo)) {
      res.send('Please supply a valid id.');
    }
    util.doGetToDo(gettodo).then((results) => {
      res.json(results);
    }, next);
  },

  putToDo: (req, res, next, puttodo) => {
    if (!util.validId(puttodo) || !req.body.content) {
      res.send('Please supply a valid id and content.');
    }
    const content = req.body.content;
    util.doPutToDo(puttodo, content).then((results) => {
      res.json(results);
    }, next);
  },

  postToDo: (req, res, next) => {
    if (!req.body.content || !req.body.author) {
      res.send('Malformed To-Do. Try again');
    } else {
      const newToDo = new ToDo({
        content: req.body.content,
        author: req.body.author.toLowerCase(),
      });
      util.doPostToDo(newToDo).then((result) => {
        const message = result.content;
        // eslint-disable-next-line no-underscore-dangle
        const id = result._id;
        const responseObject = { content: message, id };
        res.json(responseObject);
      }, next);
    }
  },

  deleteToDo: (req, res, next, deletetodo) => {
    if (!util.validId(deletetodo)) {
      res.send('Please supply a valid id.');
    } else {
      util.doDeleteToDo(deletetodo).then(() => {
        res.send('Your note has been deleted');
      }, next);
    }
  },

  getWeather: (req, res, next, location) => {
    const parsedLocation = location.split(',');
    const lat = parsedLocation[0];
    const long = parsedLocation[1];
    util.doGetWeather(lat, long).then((response) => {
      let data = null;
      data = JSON.parse(response);
      const weatherData = {
        temperature: data.currently.temperature,
        conditions: data.currently.summary,
        rainChange: data.currently.precipProbability,
        icon: data.currently.icon,
      };
      res.json(weatherData);
    }, next);
  },

};
