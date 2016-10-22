angular.module('todew')

.controller('HomepageController', ($scope, $http, $log, $window) => {
  $scope.getData = (authorName) => {
    $http({
      method: 'GET',
      url: `/todos/author/${authorName}`,
    }).then((response) => {
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
        // // // // // // // // // // //
        // TODO: Can't delete newly saved todo until refresh.
        // // // ID is not being pushed to $scope.todos :(
        $log.log(response.data);
        $log.log($scope.todos);
      }, (error) => {
        $log.error(error);
      });
      $scope.newToDo = '';
    }
  };

  $scope.deleteTodo = (event) => {
    if (!$scope.currentAuthor) {
      $log.error('No Username Specified!');
    } else {
      const id = event.target.id;
      $http({
        method: 'DELETE',
        url: `/todos/${id}`,
      }).then((response) => {
        $log.log(response.data);
        // // // // // // // // // // //
        // FIXME: REALLY BAD WAY OF UPDATING THE PAGE :D
        // // //
        $scope.setAuthorAndGetData();
      }, (error) => {
        $log.error(error);
      });
    }
  };

  const getLocation = () => {
    if ('geolocation' in $window.navigator) {
      // const currentLocation = [];
      $window.navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        $log.log(`Your Location: ${latitude},${longitude}`);
        // currentLocation.push(position.coords.latitude, position.coords.longitude);
        $http.get(`/weather/${latitude},${longitude}`);
      });
    } else {
      $log.log('Sorry, geolocation is not available in your browser.');
    }
  };
  getLocation();
});
