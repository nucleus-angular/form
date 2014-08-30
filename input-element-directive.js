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
      transclude: true,
      require: ['nagInputElement', '^form'],
      templateUrl: 'components/nucleus-angular-form/assets/templates/input-element.html',
      controller: [function() {
        this.setModelController = function(modelController) {
          this.modelController = modelController;
        }.bind(this);
      }],
      compile: function($element, $attributes) {
        $element.find('.input-element').addClass($element.attr('class'));
        $element.removeClass();

        return function($scope, $element, $attributes, $controllers) {
          function updateValidationClass(isValid) {
            if(isValid === true) {
              $element.find('.input-element').removeClass('invalid').addClass('valid');
            } else {
              $element.find('.input-element').removeClass('valid').addClass('invalid');
            }
          }

          var selfController = $controllers[0];
          var formController = $controllers[1];

          //When need to use $applyAsync in order for the $valid of the model controller to be set properly
          $scope.$applyAsync(function() {
            if($attributes.validateOnLoad === 'true') {
              console.log('update on load');
              updateValidationClass(formController[selfController.modelController.$name].$valid);
            }
          });

          $scope.$watch(formController.$name + '.' + selfController.modelController.$name + '.$pristine', function(newValue) {
            if(formController[selfController.modelController.$name].$dirty) {
              updateValidationClass(formController[selfController.modelController.$name].$valid);
            }
          });
        }
      }
    };
  }
]);

