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
          this.setModelController = function(modelController) {
            $scope.modelController = modelController;
          }
        }
      ],
      compile: function(element, attributes, transclude) {
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
          //todo: make configurable
          if(attributes.iconPosition === 'before' || attributes.iconPosition === 'after') {
            var successIconClass = attributes.successIcon || 'nag-icon-font-checkmark-circle ' + positionClass;
            var errorIconClass = attributes.successIcon || 'nag-icon-font-cancel-circle ' + positionClass;
            var iconHtml = $('<span class="icons"><span class="valid-icon ' + successIconClass + '" ng-show="modelController.$dirty && modelController.$valid"></span><span class="invalid-icon ' + errorIconClass + '" ng-show="modelController.$dirty && modelController.$invalid"></span></span>');

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
