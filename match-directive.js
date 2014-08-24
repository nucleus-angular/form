/**
 * # Match Form Validator
 *
 * Validates that the value of the forn input element matches the value of another form input element by passing the model name.
 *
 * ```html
 * <input type="text" name="password" ng-model="formData.p" />
 * <input type="text" name="passwordConfirm" ng-model="formData.pc" nag-validate-match="formData.p" />
 * ```
 *
 * @module nag.form.validate.match
 * @ngdirective nagValidateMatch
 *
 * @nghtmlattribute {string} nag-validate-match The name of the model for the form input element that this form input element should match
 */
angular.module('nag.form.validate.match', [])
.directive('nagValidateMatch', [
  function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attributes, controller) {
        var validate = function(value) {
          var match = scope.$eval(attributes.nagValidateMatch);

          if(dataValidation.validate('match',value, match.$viewValue) === true) {
            controller.$setValidity('nagMatch', true);
            match.$setValidity('nagMatch', true);
          } else {
            controller.$setValidity('nagMatch', false);
            match.$setValidity('nagMatch', false);
          }

          return value;
        };

        controller.$formatters.push(validate);
        controller.$parsers.unshift(validate);

        attributes.$observe('nagValidateMatch', function() {
          validate(controller.$modelValue);
        });
      }
    };
  }
]);
