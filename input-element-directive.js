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
      require: ['^form'],
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
          var formController = $controllers[0];
          var modelName = $attributes.nagInputElement.split('.')[1];

          var updateValidation = function() {
            var modelController = formController[modelName];
            $element.find('.input-element').removeClass('invalid valid');

            if($attributes.validateOnLoad === 'true' || modelController.$dirty) {
              if(modelController.$valid === true) {
                $element.find('.input-element').removeClass('invalid').addClass('valid');
              } else {
                $element.find('.input-element').removeClass('valid').addClass('invalid');
              }
            }
          };

          //we need to use $applyAsync in order for the $valid of the model controller to be set properly
          $scope.$applyAsync(function() {
            updateValidation();

            //handles first time change or change after model resetted to pristine
            $scope.$watch($attributes.nagInputElement + '.$pristine', function(newValue) {
              updateValidation();
            });

            $scope.$watch($attributes.nagInputElement + '.$valid', function(newValue) {
              updateValidation();
            });
          });

        }
      }
    };
  }
]);
