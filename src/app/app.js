angular.module('todew', ['ngRoute', 'ui.bootstrap', 'ngAnimate'])

.config(($routeProvider, $httpProvider) => {
  $routeProvider
    .when('/', {
      templateUrl: 'app/partials/homepage.html',
      controllerAs: 'HomepageController',
      // controller: 'HomepageController',
    });
  // $httpProvider.defaults.useXDomain = true;
  // delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
