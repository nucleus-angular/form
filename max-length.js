/**
 * # Max Length Form Validator
 *
 * Validates that a form input element's value in under a certain maximum string length.
 *
 * ```html
 * <input type="text" ng-model="age" nag-validate-max-length="13" />
 * ```
 *
 * @module nag.form.validate.maxLength
 * @ngdirective nagValidateMaxLength
 *
 * @nghtmlattribute {number} nag-validate-max-length The maximum length
 */
angular.module('nag.form.validate.maxLength', [])
.directive('nagValidateMaxLength', [
  'nagDataValidation',
  function(nagDataValidation) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attributes, controller) {
        var validate = function(value) {
          if(nagDataValidation.validate('maxLength', value, attributes.nagValidateMax) === true) {
            controller.$setValidity('nagMaxLength', true);
          } else {
            controller.$setValidity('nagMaxLength', false);
          }

          return value;
        };

        controller.$formatters.push(validate);
        controller.$parsers.unshift(validate);

        attributes.$observe('nagValidateMaxLength', function() {
          validate(controller.$modelValue);
        });
      }
    };
  }
]);
