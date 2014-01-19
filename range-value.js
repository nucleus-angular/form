/**
 * # Range Value Form Validator
 *
 * Make sure of form input element's value in within a certain numerical value.
 *
 * ```html
 * <input type="text" ng-model="age" nag-validate-range-value=:{min: 13, max: 100}"/>
 * ```
 *
 * @module nag.form.validate.rangeValue
 * @ngdirective nagValidateRangeValue
 *
 * @nghtmlattribute {object} nag-validate-range-value An object with a min and max property
 */
angular.module('nag.form.validate.rangeValue', [])
.directive('nagValidateRangeValue', [
  function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attributes, controller) {
        var options = scope.$eval(attributes.nagValidateRangeValue);
        var validate = function(value) {
          if(dataValidation.validate('rangeValue', value, options.min, options.max) === true) {
            controller.$setValidity('nagRangeValue', true);
          } else {
            controller.$setValidity('nagRangeValue', false);
          }

          return value;
        };

        controller.$formatters.push(validate);
        controller.$parsers.unshift(validate);

        attributes.$observe('nagValidateRangeValue', function() {
          validate(controller.$modelValue);
        });
      }
    };
  }
]);
