/**
 * # Required Form Validator
 *
 * Makes sure there is a value for the forn input element.
 *
 * ```html
 * <input type="text" ng-model="username" nag-validate-required />
 * ```
 *
 * @module nag.form.validate.required
 * @ngdirective nagValidateRequired
 *
 * @nghtmlattribute {null} nag-validate-required
 */
angular.module('nag.form.validate.required', [])
.directive('nagValidateRequired', [
  function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attributes, controller) {
        var validate = function(value) {
          if(dataValidation.validate('notEmpty', value) === true) {
            controller.$setValidity('nagRequired', true);
          } else {
            controller.$setValidity('nagRequired', false);
          }

          return value;
        };

        controller.$formatters.push(validate);
        controller.$parsers.unshift(validate);

        attributes.$observe('nagValidateRequired', function() {
          validate(controller.$modelValue);
        });
      }
    };
  }
]);
