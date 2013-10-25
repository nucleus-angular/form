/**
 * # Min Value Form Validator
 *
 * Validates that a form input element in over a certain minimum numeric value.
 *
 * ```html
 * <input type="text" ng-model="age" nag-validate-min-value="13" />
 * ```
 *
 * @module nag.form.validate.minValue
 * @ngdirective nagValidateMinValue
 *
 * @nghtmlattribute {number} nag-validate-min-value The minimum value
 */
angular.module('nag.form.validate.minValue', [])
.directive('nagValidateMinValue', [
  'nagDataValidation',
  function(nagDataValidation) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attributes, controller) {
        var validate = function(value) {
          if(nagDataValidation.validate('minValue', value, attributes.nagValidateMin) === true) {
            controller.$setValidity('nagMinValue', true);
          } else {
            controller.$setValidity('nagMinValue', false);
          }

          return value;
        };

        controller.$formatters.push(validate);
        controller.$parsers.unshift(validate);

        attributes.$observe('nagValidateMinValue', function() {
          validate(controller.$modelValue);
        });
      }
    };
  }
]);
