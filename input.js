/**
 * # Input
 *
 * This directive is to be used in connection with nagInputElement or nagExtendText in order to tell those directive what the ngModelController in for them.
 *
 * EXAMPLE TOOD
 *
 * @module nag.form.input
 * @ngdirective nagInput
 *
 * @nghtmlattribute nag-input
 */
angular.module('nag.form.input', [])
.directive('nagInput', [
  function() {
    return {
      restrict: 'EA',
      require: ['ngModel', '^?nagInputElement', '^?nagExtendText'],
      link: function(scope, element, attributes, controllers) {
        if(controllers[1]) {
          controllers[1].setModelController(controllers[0]);
        }

        if(controllers[2]) {
          controllers[2].setModelController(controllers[0]);
        }
      }
    };
  }
]);
