/**
 * # Range Form Validator
 *
 * Make sure of form input element's value in within a certian numerical value.
 *
 * ```html
 * <input type="text" ng-model="age" nag-validate-range=:{min: 13, max: 100}"/>
 * ```
 *
 * @module nag.form.validate.range
 * @ngdirective nagValidateRange
 *
 * @nghtmlattribute {object} nag-validate-range An object with a min and max property
 */
angular.module('nag.form.validate.range', [])
.directive('nagValidateRange', [
  'nagDataValidation',
  function(nagDataValidation) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attributes, controller) {
        var options = scope.$eval(attributes.nagValidateRange);
        var validate = function(value) {
          if(nagDataValidation.validate('range', value, options.min, options.max) === true) {
            controller.$setValidity('nagRange', true);
          } else {
            controller.$setValidity('nagRange', false);
          }

          return value;
        };

        controller.$formatters.push(validate);
        controller.$parsers.unshift(validate);

        attributes.$observe('nagValidateRange', function() {
          validate(controller.$modelValue);
        });
      }
    };
  }
]);
