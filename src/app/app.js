var app = angular.module('todew', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/partials/homepage.html',
      controller: 'homepageController',
    });
});
