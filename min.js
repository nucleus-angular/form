/**
 * # Min Form Validator
 *
 * Validates that a form input element in over a certain minimun numeric value.
 *
 * ```html
 * <input type="text" ng-model="age" nag-validate-min="13" />
 * ```
 *
 * @module nag.form.validate.min
 * @ngdirective nagValidateMin
 *
 * @nghtmlattribute {number} nag-validate-min The minimum value
 */
angular.module('nag.form.validate.min', [])
.directive('nagValidateMin', [
  'nagDataValidation',
  function(nagDataValidation) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attributes, controller) {
        var validate = function(value) {
          if(nagDataValidation.validate('min', value, attributes.nagValidateMin) === true) {
            controller.$setValidity('nagMin', true);
          } else {
            controller.$setValidity('nagMin', false);
          }

          return value;
        };

        controller.$formatters.push(validate);
        controller.$parsers.unshift(validate);

        attributes.$observe('nagValidateMin', function() {
          validate(controller.$modelValue);
        });
      }
    };
  }
]);
