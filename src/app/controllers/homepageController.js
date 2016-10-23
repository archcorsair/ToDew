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

  const conditionMap = {
    'clear-day': 'wi-day-sunny',
    'clear-night': 'wi-night-clear',
    'partly-cloudy-day': 'wi-day-cloudy',
    'partly-cloudy-night': 'wi-night-alt-partly-cloudy',
    rain: 'wi-rain',
    snow: 'wi-snow',
    sleet: 'wi-sleet',
    wind: 'wi-strong-wind',
    fog: 'wi-fog',
    cloudy: 'wi-cloudy',
    thunderstorm: 'wi-thunderstorm',
    tornado: 'wi-tornado',
    hail: 'wi-hail',
    default: 'wi-na',
  };

  const getLocation = () => {
    if ('geolocation' in $window.navigator) {
      $window.navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        $http.get(`/weather/${latitude},${longitude}`).then((response) => {
          // $log.log(response.data);
          $scope.currentTemp = `${Math.floor(response.data.temperature)}°`;
          $scope.currentConditions = response.data.conditions;
          $scope.weatherIcon = response.data.icon;
          if (response.data.rainChance > 0) {
            $scope.changeOfRain = `Chance of Rain: ${response.data.rainChance}`;
          }
        }, (error) => {
          $log.error(error);
        });
      });
    } else {
      $log.log('Sorry, geolocation is not available in your browser.');
    }
  };
  getLocation();
});
