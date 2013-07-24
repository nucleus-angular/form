/**
 * Allows us to be able to set the module container for the input element and extend text directives (since those directive are not applied directly to a
 * input element)
 *
 * @module nag.form.input
 * @ngdirective nagInput
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
