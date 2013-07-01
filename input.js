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