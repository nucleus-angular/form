angular.module('app.home.home', [
  'app.core'
])
.config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider
    .state('app.home.home', {
      url: '',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    });
  }
])
.controller('HomeCtrl', ['$scope', '$rootScope', 'nagFormHelper', function($scope, $rootScope, nagFormHelper) {
  $scope.eventData;
  $scope.resettableDefaults = {
    firstName: 'first name',
    lastName: null
  };
  $scope.resettableObject = {
    firstName: null,
    lastName: 'last name'
  };
  $scope.validationDefaults = {
    firstName: 'first name4',
    email: 'test@example'
  };

  $scope.resetResettableForm = function() {
    nagFormHelper.reset($scope.resettable, $scope.resettableDefaults);
  };

  $scope.resetValidationForm = function() {
    nagFormHelper.reset($scope.validation, $scope.validationDefaults);
  };

  $rootScope.$on('NagForm[resettable]/resetted', function(self, formController) {
    $scope.eventData = 'reset trigger for form: ' + formController.$name;
  });

  $scope.secondResettableDefaults = {
    firstName: null,
    lastName: 'last name'
  };
  $scope.secondResettableObject = {
    firstName: 'first name2',
    lastName: null
  };

  $scope.resetSecondResettableForm = function() {
    $rootScope.$broadcast('NagForm[secondResettable]/reset', $scope.secondResettableDefaults);
  };

  $scope.inputElementObject = {
    firstName: 'first name3',
    middleName: null,
    lastName: null,
    email: null,
    username: null
  };

  $scope.validationObject = {
    firstName: 'first name4',
    middleName: null,
    lastName: null,
    email: 'test@example',
    email2: null,
    username: null,
    password: null,
    confirmPassword: null,
    equals: null,
    maxLength: null,
    maxValue: null,
    minValue: null,
    rangeLength: null,
    rangeValue: null
  };
}]);
