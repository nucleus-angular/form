/**
 * # Input Element
 *
 * This directive will wrap any for input element up with structure for displaying form errors.
 *
 * EXAMPLE TODO
 *
 * @module nag.form.inputElement
 * @ngdirective nagInputElement
 */
angular.module('nag.form.inputElement', [])
.directive('nagInputElement', [
  '$compile',
  function($compile) {
    return {
      restrict: 'EA',
      transclude: true,
      templateUrl: function(element, attributes) {
        if(attributes.showAdditionalData !== 'true') {
          return 'components/nucleus-angular-form/assets/templates/input-element-plain.html';
        }

        var iconsPosition = attributes.iconPosition === 'after' ? 'after' : 'before';
        return 'components/nucleus-angular-form/assets/templates/input-element-icons-' + iconsPosition + '.html';
      },
      scope: {
        showAdditionalData: '@',
        iconPosition: '@',
        messageDisplay: '@'
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
      compile: function(element, attributes, transclude) {
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

        element.addClass('input-element');

        return {
          pre: function(scope, element, attributes) {
            scope.isPlain = (attributes.showAdditionalData !== 'true' ? true : false);
            scope.messageInline = (attributes.messageDisplay !== 'block' ? true : false);
          },
          post: function(scope, element, attributes) {
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
            }
          }
        };
      }
    };
  }
]);
