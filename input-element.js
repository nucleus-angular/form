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
angular.module('nag.form.inputElement', [
  'nag.core'
])
.directive('nagInputElement', [
  '$compile',
  'nagDefaults',
  function($compile, nagDefaults) {
    return {
      restrict: 'EA',
      transclude: true,
      scope: {
        //the model is assume to be the form object
        model: '=dataModel',
        showAdditionalData: '@',
        iconPosition: '@',
        messageDisplay: '@',
        successIcon: '@',
        errorIcon: '@'
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
          nagMin: 'Value to small',
          nagMax: 'Value to big',
          nagRange: 'Not within range',
          nagMatch: 'Values must match'
        };

        element.addClass('input-element');
        element.append('<span class="container" ng-class="{invalid: modelController.$invalid && !options.isPlain && modelController.$dirty, valid: modelController.$valid && !options.isPlain && modelController.$dirty, plain: modelController.$pristine || options.isPlain}"></span>');

        if(attributes.showAdditionalData === 'true') {
          var positionClass = attributes.iconPosition || 'after';

          if(attributes.iconPosition === 'before' || attributes.iconPosition === 'after') {
            var iconHtml = $('<span class="icons"><span class="valid-icon ' + positionClass + '" ng-show="modelController.$dirty && modelController.$valid"></span><span class="invalid-icon ' + positionClass + '" ng-show="modelController.$dirty && modelController.$invalid"></span></span>');

            if(attributes.iconPosition === 'before') {
              element.find('.container').prepend(iconHtml);
            } else {
              element.find('.container').append(iconHtml);
            }
          }

          var messageTag = (attributes.messageDisplay === 'block' ? 'div' : 'span');
          var messageHtml = $('<' + messageTag  + ' class="input-message" ng-class="{\'error-text\': modelController.$invalid, \'success-text\': modelController.$valid}" ng-show="modelController.$dirty">{{ getInputMessage() }}</' + messageTag + '>');

          element.append(messageHtml);
        }

        return {
          pre: function(scope, element, attributes) {
            /**
             * Options for the input element
             *
             * @ngscope
             *
             * @property options
             * @type {object}
             */
            scope.options = nagDefaults.getInputElementOptions({});
            scope.options.isPlain = (attributes.showAdditionalData === 'true' ? false : true);
          },
          post: function(scope, element, attributes) {
            transclude(scope, function(clone) {
              if(attributes.showAdditionalData === 'true') {
                if(attributes.iconPosition === 'before') {
                  element.find('.icons').after(clone);
                } else if(attributes.iconPosition === 'after') {
                  element.find('.icons').before(clone);
                } else {
                  element.find('.container').append(clone);
                }
              } else {
                element.find('.container').append(clone);
              }
            });

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

              if(scope.modelController) {
                _.forEach(scope.modelController.$error, function(value, key) {
                  if(!returnValue && value === true) {
                    returnValue = errorMessages[key];
                  }
                });

                if(!returnValue) {
                  returnValue = 'Valid';
                }
              } else {
                //console.log('can\'t find input');
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
