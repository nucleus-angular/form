/**
 * # Input Element
 *
 * This directive will wrap any for input element up with structure for displaying form errors.
 *
 * EXAMPLE TODO
 *
 * @module nag.form
 * @ngdirective nagInputElement
 */
angular.module('nag.form')
.directive('nagInputElement', [
  '$compile',
  function($compile) {
    return {
      restrict: 'EA',
      transclude: true,
      templateUrl: function(element, attributes) {
        var templatePath = '';

        if(attributes.showAdditionalData !== 'true') {
          templatePath = 'components/nucleus-angular-form/assets/templates/input-element-plain.html';
        } else if(attributes.iconPosition === 'after') {
          templatePath = 'components/nucleus-angular-form/assets/templates/input-element-icons-after.html';
        } else {
          templatePath = 'components/nucleus-angular-form/assets/templates/input-element-icons-before.html';
        }

        return templatePath;
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
            };

            //need to change the main element validation class with the modelController changes
            scope.$watchCollection('modelController', function(newValue, oldValue) {
              if((newValue.$dirty || newValue.$viewValue) && newValue.$valid) {
                element.addClass('valid').removeClass('invalid');
              } else if((newValue.$dirty || newValue.$viewValue) && newValue.$invalid) {
                element.addClass('invalid').removeClass('valid');
              } else {
                element.removeClass('valid').removeClass('invalid');
              }
            });

            //TODO: research: this seems to work however I have not idea and it only gets called 2 times even though it can take a while to load large tree
            var interval = setInterval(function() {
              //console.log('test');
              if(element.find('.icons img').length > 0) {
                //console.log('test2');
                clearInterval(interval);
                SVGInjector(element.find('.icons img').get());
              }
            }, 0);
          }
        };
      }
    };
  }
]);
