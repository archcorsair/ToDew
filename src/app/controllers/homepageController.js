angular.module('todew')

.controller('HomepageController', ($scope, $http, $log) => {
  $scope.getData = (authorName) => {
    $http({
      method: 'GET',
      url: `/todos/author/${authorName}`,
    }).then((response) => {
      // $log.log('response: ', response.data);
      response.data.forEach((todo) => {
        $scope.todos.push(todo.content);
      });
    }, (error) => {
      $log.error(error);
    });
  };

  $scope.setAuthorAndGetData = () => {
    $scope.currentAuthor = $scope.authorName;
    $scope.getData($scope.authorName.toLowerCase());
  };

  $scope.addToDo = () => {
    $log.log('Adding a todo!', $scope.newToDo);
    $scope.newToDo = '';
  };

  $scope.done = () => {
    $scope.todo.done = true;
  };
  $scope.todos = [];
});
