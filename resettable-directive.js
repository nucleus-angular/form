/**
 * # Resettable Form
 *
 * Add form reset functionality to the current scope.
 *
 * @module nag.form
 * @ngdirective nagResettableForm
 *
 * @nghtmlattribute {null} nag-resttable-form
 */
angular.module('nag.form')
.directive('nagResettableForm', [
  '$rootScope',
  'nagFormHelper',
  function($rootScope, nagFormHelper) {
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
         * Will reset the form
         *
         * @respondto NagForm[form name]/reset
         * @eventlevel root
         */
        scope.unregisterFormResetEvent = $rootScope.$on('NagForm[' + controllers[0].$name + ']/reset', function(self, defaults) {
          nagFormHelper.reset(controllers[0], defaults);
        });
      }
    };
  }
]);