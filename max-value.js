/**
 * # Max Value Form Validator
 *
 * Validates that a form input element in under a certain maximum numeric value.
 *
 * ```html
 * <input type="text" ng-model="age" nag-validate-max-value="13" />
 * ```
 *
 * @module nag.form.validate.maxValue
 * @ngdirective nagValidateMaxValue
 *
 * @nghtmlattribute {number} nag-validate-max-value The maximum value
 */
angular.module('nag.form.validate.maxValue', [
  'nag.dataValidation'
])
.directive('nagValidateMaxValue', [
  'nagDataValidation',
  function(nagDataValidation) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attributes, controller) {
        var validate = function(value) {
          if(nagDataValidation.validate('maxValue', value, attributes.nagValidateMaxValue) === true) {
            controller.$setValidity('nagMaxValue', true);
          } else {
            controller.$setValidity('nagMaxValue', false);
          }

          return value;
        };

        controller.$formatters.push(validate);
        controller.$parsers.unshift(validate);

        attributes.$observe('nagValidateMaxValue', function() {
          validate(controller.$modelValue);
        });
      }
    };
  }
]);
