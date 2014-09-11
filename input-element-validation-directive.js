/**
 * # Input Element Validation
 *
 * This directive adds the DOM to display form validation.
 *
 * EXAMPLE TODO
 *
 * @module nag.form
 * @ngdirective nagInputElementValidation
 * @nghtmlattribute nag-input-element-validation {null}
 * @nghtmlattribute inputName {string}
 */
angular.module('nag.form')
.value('nagFormMessagesInclude', '/components/nucleus-angular-form/assets/templates/default-validation-messages.html')
.value('nagFormInvalidIconPath', '/components/nucleus-angular-sass-framework/assets/svg/open-iconic/svg/x.svg')
.value('nagFormValidIconPath', '/components/nucleus-angular-sass-framework/assets/svg/open-iconic/svg/check.svg')
.value('nagFormInputValidationTemplate', '/components/nucleus-angular-form/assets/templates/validation.html')
.directive('nagInputElementValidation', [
  '$injector',
  '$compile',
  'nagHelper',
  'nagSvgHelper',
  function($injector, $compile, nagHelper, nagSvgHelper) {
    return {
      restrict: 'EA',
      require: ['^nagInputElement', '^form'],
      template: function(element, attributes) {
        var template = '';

        if(attributes.template) {
          template = nagHelper.getAsyncTemplate(attributes.template);
        } else if(element[0].innerHTML !== '') {
          template = element[0].innerHTML;
        } else {
          template = nagHelper.getAsyncTemplate($injector.get('nagFormInputValidationTemplate'));
        }

        return template;
      },
      compile: function($element, $attributes) {
        $element.addClass('u-hide');
        $element.find('[ng-messages-multiple]').attr('ng-messages-include', $injector.get('nagFormMessagesInclude'));
        $element.find('.handle img').attr('src', $injector.get('nagFormInvalidIconPath'));
        $element.find('.valid-indicator img').attr('src', $injector.get('nagFormValidIconPath'));

        return function($scope, $element, $attributes, $controllers) {
          var nagInputElementController = $controllers[0];
          var formController = $controllers[1];
          var validateOnLoad = $element.parents('[nag-input-element]').attr('data-validate-on-load');
          var updateValidation = function(modelController) {
            if(validateOnLoad === 'true' || modelController.$dirty) {
              $element.removeClass('u-hide');

              if(modelController.$valid === true) {
                $element.find('.valid-indicator').removeClass('u-hide');
                $element.find('.invalid-indicator').addClass('u-hide');
              } else {
                $element.find('.valid-indicator').addClass('u-hide');
                $element.find('.invalid-indicator').removeClass('u-hide');
              }
            }
          };

          //we need to use $applyAsync() in order to make sure nagInputElementController.modelController is properly set
          $scope.$applyAsync(function() {
            nagSvgHelper.inject([
              $element.find('.handle img')[0],
              $element.find('.valid-indicator img')[0]
            ]);

            $scope.$watch(formController.$name + '[\'' + nagInputElementController.modelController.$name + '\'].$dirty', function(newValue) {
              updateValidation(nagInputElementController.modelController);
            });

            $scope.$watch(formController.$name + '[\'' + nagInputElementController.modelController.$name + '\'].$valid', function(newValue) {
              updateValidation(nagInputElementController.modelController);
            });

            var newElement = $compile($element.find('[ng-messages-multiple]').attr('ng-messages', formController.$name + '[\'' + nagInputElementController.modelController.$name + '\'].$error')[0].outerHTML)($scope);
            $element.find('[ng-messages-multiple]').replaceWith(newElement);
          });
        }
      }
    };
  }
]);

