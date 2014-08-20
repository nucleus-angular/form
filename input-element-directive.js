/**
 * # Input Element
 *
 * This directive will wrap any for input element up with structure for displaying form errors.
 *
 * It is important to note that you must define 2 angular `value()` in order to use this directive:
 *
 * - nagFormValidIconPath
 * - nagFormInvalidIconPath
 *
 * Which are expected to be SVG files.
 *
 * EXAMPLE TODO
 *
 * @module nag.form
 * @ngdirective nagInputElement
 */
angular.module('nag.form')
.directive('nagInputElement', [
  '$compile',
  '$injector',
  function($compile, $injector) {
    //todo: this needs to be configurable
    var errorMessages = {
      nagRequired: 'Required',
      nagEmail: 'Must be valid email',
      nagEquals: "Value not what it should be",
      nagMinValue: 'Value to small',
      nagMaxValue: 'Value to big',
      nagRangeValue: 'Not within range',
      nagMinLength: 'Length to small',
      nagMaxLength: 'Length to big',
      nagRangeLength: 'Not within range',
      nagMatch: 'Values must match'
    };

    return {
      restrict: 'EA',
      transclude: true,
      templateUrl: 'components/nucleus-angular-form/assets/templates/input-element.html',
      scope: {
        showAdditionalData: '@'
      },
      controller: [
       '$scope',
       function($scope) {
         /**
          * Sets the model for the input element since this directive can not be applied directly to an input element
          *
          * @ngdirectivecontroller
          * @method setModelController
          *
          * @param {object} modelController The model controller for the input element
          */
         this.setModelController = function(modelController) {
           $scope.modelController = modelController;
         }
       }
      ],
      compile: function(element, attributes) {
        if(!$injector.has('nagFormValidIconPath') || !$injector.has('nagFormInvalidIconPath')) {
          throw new Error("You must define a SVG paths for `nagFormValidIconPath` and `nagFormValidIconPath` to use the input element directive");
        }

        element.addClass('input-element');

        return function(scope, element, attributes) {
          scope.validIconPath = $injector.get('nagFormValidIconPath');
          scope.invalidIconPath = $injector.get('nagFormInvalidIconPath');

          /**
           * Retrieve the input message
           *
           * @ngscope
           *
           * @method getInputMessage
           *
           * @returns {string} Input message
           */
          scope.getInputMessage = function() {
            var returnValue;
            var hasError;

            if(scope.modelController) {
              _.forEach(scope.modelController.$error, function(value, key) {
                if(!returnValue && value === true) {
                  hasError = true;
                  returnValue = errorMessages[key];
                }
              });

              if(!returnValue && hasError === true) {
                returnValue = 'Invalid';
              } else if(!returnValue) {
                returnValue = 'Valid';
              }
            } else {
              returnValue = '';
            }

            return returnValue;
          };

          scope.isValid = function() {
            return (scope.modelController.$dirty || scope.modelController.$viewValue) && scope.modelController.$valid;
          };

          scope.showIcon = function() {
            return !scope.modelController.$pristine || scope.modelController.$viewValue;
          };

          //need to change the main element validation class with the modelController changes
          scope.$watchCollection('modelController', function(newValue, oldValue) {
            element.removeClass('valid').removeClass('invalid').removeClass('plain');

            if(newValue.$pristine && !newValue.$viewValue) {
              element.addClass('plain');
            } else if((newValue.$dirty || newValue.$viewValue) && newValue.$valid) {
              element.addClass('valid');
            } else if((newValue.$dirty || newValue.$viewValue) && newValue.$invalid) {
              element.addClass('invalid');
            }
          });

          //TODO: research: is this the best way to handle this issue
          var interval = setInterval(function() {
            //console.log('test');
            if(element.find('.tooltip img,.icon').length > 0) {
              //console.log('test2');
              clearInterval(interval);
              SVGInjector(element.find('.tooltip img,.icon').get());
            }
          }, 0);
        }
      }
    };
  }
]);
