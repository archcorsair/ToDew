angular.module('todew')

.controller('HomepageController', ($scope) => {
  $scope.addToDo = () => {
    console.log('Adding a todo!', $scope.newToDo);
    $scope.newToDo = '';
  };

  $scope.done = () => {
    $scope.todo.done = true;
  };
  $scope.todos = [{ content: 'here is a note' }, { content: 'here is a note' }, { content: 'here is another note' }, { content: 'and another!' }, { content: 'here is a note. damn!!' }];

});
