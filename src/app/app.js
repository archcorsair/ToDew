angular.module('todew', ['ngRoute', 'ui.bootstrap'])

.config(($routeProvider) => {
  $routeProvider
    .when('/', {
      templateUrl: 'app/partials/homepage.html',
      controllerAs: 'HomepageController',
      // controller: 'HomepageController',
    });
});
