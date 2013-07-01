angular.module('nag.form.validate.equals', [])
.directive('nagValidateEquals', [
  'nagDataValidation',
  function(nagDataValidation) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attributes, controller) {
        var validate = function(value) {
          if(nagDataValidation.validate('match', value, attributes.nagValidateEquals) === true) {
            controller.$setValidity('nagEquals', true);
          } else {
            controller.$setValidity('nagEquals', false);
          }

          return value;
        };

        controller.$formatters.push(validate);
        controller.$parsers.unshift(validate);

        attributes.$observe('nagValidateEquals', function() {
          validate(controller.$modelValue);
        });
      }
    };
  }
]);
