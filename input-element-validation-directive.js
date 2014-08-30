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
  'nagHelper',
  'nagSvgHelper',
  function($injector, nagHelper, nagSvgHelper) {
    return {
      restrict: 'EA',
      require: '^form',
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
      require: '^nagInputElement',
      compile: function($element, $attributes) {
        $element.addClass('u-hide');
        $element.find('.valid-indicator').attr('ng-show', $attributes.nagInputElementValidation + '.$valid');
        $element.find('.invalid-indicator').attr('ng-show', $attributes.nagInputElementValidation + '.$invalid');
        $element.find('[ng-messages-multiple]').attr('ng-messages', $attributes.nagInputElementValidation + '.$error');
        $element.find('[ng-messages-multiple]').attr('ng-messages-include', $injector.get('nagFormMessagesInclude'));
        $element.find('.handle img').attr('src', $injector.get('nagFormInvalidIconPath'));
        $element.find('.valid-indicator img').attr('src', $injector.get('nagFormValidIconPath'));

        return function($scope, $element, $attributes) {
          var validateOnLoad = $element.parents('[nag-input-element]').attr('data-validate-on-load');
          nagSvgHelper.inject([
            $element.find('.handle img')[0],
            $element.find('.valid-indicator img')[0]
          ]);

          if(validateOnLoad === 'true') {
            $element.removeClass('u-hide');
          } else {
            $scope.$watch($attributes.nagInputElementValidation + '.$dirty', function(newValue) {
              if(newValue === true) {
                $element.removeClass('u-hide');
              } else {
                $element.addClass('u-hide');
              }
            });
          }
        }
      }
    };
  }
]);

