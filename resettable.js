/**
 * # Resettable Form
 *
 * Add form reset functionality to the current scope.
 *
 * @module nag.form.resettable
 * @ngdirective nagResettableForm
 *
 * @nghtmlattribute {null} nag-resttable-form
 */
angular.module('nag.form.resettable', [])
.directive('nagResettableForm', [
  '$rootScope',
  function($rootScope) {
    return {
      restrict: 'EA',
      require: ['form'],
      controller: [
        '$scope',
        function($scope) {
          /**
           * Unregisters the callback tied to the trigger-auto-focus event
           *
           * @ngscope
           * @method unregisterFormResetEvent
           * @type function
           */
          $scope.unregisterFormResetEvent = null;

          $scope.$on('$destroy', function() {
            if($scope.unregisterFormResetEvent) {
              $scope.unregisterFormResetEvent();
            }
          });
        }
      ],
      link: function(scope, element, attributes, controllers) {
        /**
         * Resets the form including validation data
         *
         * @ngscope
         *
         * @method resetForm
         *
         * @param {string} form Name of the form
         * @param {object} defaults Object with form default values
         */
        scope.resetForm = function(form, defaults) {
          var clearEval;

          for(var field in form) {
            if(form[field].$setViewValue) {
              form[field].$setViewValue('');
            }

            if(form[field].$name) {
              $('[name="' + form[field].$name + '"]').val('');

              //clear the data on the model
              if(attributes.formModel && form[field].$name) {
                if(scope.$eval(attributes.formModel + '.' + form[field].$name) !== undefined) {
                  clearEval = attributes.formModel + '.' + form[field].$name + " = \'\';";
                }
              } else if(scope.$eval(form[field].$name) !== undefined) {
                clearEval = form[field].$name + " = '';";
              }

              if(clearEval) {
                scope.$eval(clearEval);
              }
            }

            clearEval = null;

            if(form.$setPristine) {
              form.$setPristine();
            }

            //todo: does not work when model is attach to a property of an object
            if(defaults) {
              for(var defaultValue in defaults) {
                if(defaults[defaultValue]) {
                  scope[defaultValue] = defaults[defaultValue];
                }
              }
            }
          }
        };

        /**
         * Will reset the form
         *
         * @respondto NagForm[form name]/reset
         * @eventlevel root
         */
        scope.unregisterFormResetEvent = $rootScope.$on('NagForm[' + controllers[0].$name + ']/reset', function(self, defaults) {
          scope.resetForm(controllers[0], defaults);
        });
      }
    };
  }
]);
