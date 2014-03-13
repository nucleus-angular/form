/**
 * # Min Length Form Validator
 *
 * Validates that a form input element in over a certain minimum string length.
 *
 * ```html
 * <input type="text" ng-model="username" nag-validate-min-length="6" />
 * ```
 *
 * @module nag.form.validate.minLength
 * @ngdirective nagValidateMinLength
 *
 * @nghtmlattribute {number} nag-validate-min-length The minimum length
 */
angular.module('nag.form.validate.minLength', [])
.directive('nagValidateMinLength', [
  function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attributes, controller) {
        var validate = function(value) {
          if(dataValidation.validate('minLength', value, attributes.nagValidateMinLength) === true) {
            controller.$setValidity('nagMinLength', true);
          } else {
            controller.$setValidity('nagMinLength', false);
          }

          return value;
        };

        controller.$formatters.push(validate);
        controller.$parsers.unshift(validate);

        attributes.$observe('nagValidateMinLength', function() {
          validate(controller.$modelValue);
        });
      }
    };
  }
]);
