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
.directive('nagInputElementValidation', [
  '$injector',
  'nagHelper',
  function($injector, nagHelper) {
    return {
      restrict: 'EA',
      template: nagHelper.template,
      compile: function(element, attributes) {
        element.find('.valid-indicator').attr('ng-show', attributes.inputName + '.$valid');
        element.find('.invalid-indicator').attr('ng-show', attributes.inputName + '.$invalid');
        element.find('[ng-messages-multiple]').attr('ng-messages', attributes.inputName + '.$error');
        element.find('[ng-messages-multiple]').attr('ng-messages-include', $injector.get('nagFormMessagesInclude'));
        element.find('.handle img').attr('src', $injector.get('nagFormInvalidIconPath'));
        element.find('.valid-indicator img').attr('src', $injector.get('nagFormValidIconPath'));
      }
    };
  }
]);

