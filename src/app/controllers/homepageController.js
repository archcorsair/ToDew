angular.module('todew')

.controller('HomepageController', ($scope, $http, $log) => {
  $http({
    method: 'GET',
    url: '/todos/author/daniel',
  }).then((response) => {
    $log.log('response: ', response);
  }, (error) => {
    $log.error(error);
  });

  $scope.addToDo = () => {
    $log.log('Adding a todo!', $scope.newToDo);
    $scope.newToDo = '';
  };

  $scope.done = () => {
    $scope.todo.done = true;
  };
  $scope.todos = [{ content: 'An example todo' }, { content: 'I am generated dynamically!' }];
});
