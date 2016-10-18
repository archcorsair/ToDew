angular.module('todew')

.controller('HomepageController', ($scope, $http, $log) => {
  $scope.getData = (authorName) => {
    $http({
      method: 'GET',
      url: `/todos/author/${authorName}`,
    }).then((response) => {
      $log.log(response);
      response.data.forEach((todo) => {
        $scope.todos.push(todo);
      });
    }, (error) => {
      $log.error(error);
    });
  };

  $scope.setAuthorAndGetData = () => {
    $scope.todos = [];
    $scope.currentAuthor = $scope.authorName;
    $scope.getData($scope.authorName.toLowerCase());
  };

  $scope.addToDo = () => {
    if (!$scope.currentAuthor) {
      $log.error('No Username Specified!');
    } else {
      $http({
        method: 'POST',
        url: '/todos',
        data: { author: $scope.currentAuthor, content: $scope.newToDo },
      }).then((response) => {
        $scope.todos.push(response.data);
      }, (error) => {
        $log.error(error);
      });
      $scope.newToDo = '';
    }
  };

  $scope.deleteToDo = () => {
    // if (!$scope.currentAuthor) {
    //   $log.error('No Username Specified!');
    // } else {
    //
    // }
  };
});
