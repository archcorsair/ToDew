angular.module('todew')

.controller('HomepageController', ($scope) => {
  const vm = this;

  vm.alerts = [
    { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
    { type: 'success', msg: 'Well done! You successfully read this important alert message.' },
  ];

  vm.addAlert = () => {
    $scope.alerts.push({ msg: 'Another alert!' });
  };

  vm.closeAlert = (index) => {
    $scope.alerts.splice(index, 1);
  };
});
