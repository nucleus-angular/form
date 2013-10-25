/**
 * # Range Length Form Validator
 *
 * Make sure of form input element's value in within a certain string length.
 *
 * ```html
 * <input type="text" ng-model="username" nag-validate-range-length=:{min: 6, max: 32}"/>
 * ```
 *
 * @module nag.form.validate.rangeLength
 * @ngdirective nagValidateRangeLength
 *
 * @nghtmlattribute {object} nag-validate-range-length An object with a min and max property
 */
angular.module('nag.form.validate.rangeLength', [])
.directive('nagValidateRangeLength', [
  'nagDataValidation',
  function(nagDataValidation) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attributes, controller) {
        var options = scope.$eval(attributes.nagValidateRange);
        var validate = function(value) {
          if(nagDataValidation.validate('rangeLength', value, options.min, options.max) === true) {
            controller.$setValidity('nagRangeLength', true);
          } else {
            controller.$setValidity('nagRangeLength', false);
          }

          return value;
        };

        controller.$formatters.push(validate);
        controller.$parsers.unshift(validate);

        attributes.$observe('nagValidateRangeLength', function() {
          validate(controller.$modelValue);
        });
      }
    };
  }
]);
