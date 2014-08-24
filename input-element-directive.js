/**
 * # Input Element
 *
 * This directive wraps an input (with or with a label) into a DOM structure to be able to display form validation
 *
 * EXAMPLE TODO
 *
 * @module nag.form
 * @ngdirective nagInputElement
 * @nghtmlattribute nag-input-element {null}
 * @nghtmlattribute input-name {string}
 * @nghtmlattribute validation-on-load {boolean}
 */
angular.module('nag.form')
.directive('nagInputElement', [
  '$injector',
  'nagHelper',
  function($injector, nagHelper) {
    return {
      restrict: 'EA',
      //template: nagHelper.template,
      transclude: true,
      templateUrl: 'components/nucleus-angular-form/assets/templates/input-element.html',
      compile: function(element, attributes) {
        var inputName = attributes.inputName;
        var ngClass;

        if(attributes.validationOnLoad !== 'true') {
          ngClass = "{'invalid': " + inputName + ".$invalid && " + inputName + ".$dirty, 'valid': " + inputName + ".$valid && " + inputName + ".$dirty}";
        } else {
          ngClass = "{'invalid': " + inputName + ".$invalid, 'valid': " + inputName + ".$valid}";
        }

        element.find('.input-element').attr('ng-class', ngClass);

        if(attributes.validationOnLoad !== 'true') {
          element.find('[nag-input-element-validation]').attr('ng-if', inputName + '.$dirty');
        }

        element.find('[nag-input-element-validation]').attr('data-input-name', inputName);
      }
    };
  }
]);
