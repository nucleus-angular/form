/**
 * # Max Form Validator
 *
 * Validates that a form input element in under a certain minimun numeric value.
 *
 * ```html
 * <input type="text" ng-model="age" nag-validate-max="13" />
 * ```
 *
 * @module nag.form.validate.max
 * @ngdirective nagValidateMax
 *
 * @nghtmlattribute {number} nag-validate-max The maximum value
 */
angular.module('nag.form.validate.max', [])
.directive('nagValidateMax', [
  'nagDataValidation',
  function(nagDataValidation) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attributes, controller) {
        var validate = function(value) {
          if(nagDataValidation.validate('max', value, attributes.nagValidateMax) === true) {
            controller.$setValidity('nagMax', true);
          } else {
            controller.$setValidity('nagMax', false);
          }

          return value;
        };

        controller.$formatters.push(validate);
        controller.$parsers.unshift(validate);

        attributes.$observe('nagValidateMax', function() {
          validate(controller.$modelValue);
        });
      }
    };
  }
]);
