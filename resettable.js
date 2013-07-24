/**
 * Add form reset functionality to the current scope
 *
 * @module nag.form.resettable
 * @ngdirective nagValidateEmail
 */
angular.module('nag.form.resettable', [])
.directive('nagResettableForm', [
  function() {
    var attachedCallbacks = [];
    return {
      restrict: 'EA',
      require: ['form'],
      controller: [
        '$scope',
        function($scope) {

          /**
           * Add a callback to be called when the form is resetted
           *
           * @ngdirectivecontroller
           * @method addCallback
           *
           * @todo: refactor: should us an event instead an array of callbacks
           * @param callback
           */
          this.addCallback = function(callback) {
            attachedCallbacks.push(callback);
          };

          /**
           * Clears the callbacks
           *
           * @ngdirectivecontroller
           * @method resetCallbacks
           */
          this.resetCallbacks = function() {
            attachedCallbacks = [];
          }

          $scope.$on('$destroy', function() {
            //if the scope is destroyed, we no longer need this broadcast to be registered
            $scope.unregisterBroadcast();
          });
        }
      ],
      link: function(scope, element, attributes, controllers) {
        /**
         * Resets the form including validation data
         *
         * @ngscope
         * @ngdirectivecontroller
         *
         * @param {string} form Name of the form
         * @param {object} defaults Object with form default values
         * @param {function} callback Callback to execute on form reset
         */
        scope.resetForm = function(form, defaults, callback) {
          form.$dirty = false;
          form.$pristine = true;

          for(var field in form) {
            if(form[field].$pristine === false) {
              form[field].$pristine = true;
            }

            if(form[field].$dirty === true) {
              form[field].$dirty = false;
            }
          }

          //todo: does not work when model is attach to a property of an object
          if(defaults) {
            for(var defaultValue in defaults) {
              if(defaults[defaultValue]) {
                scope[defaultValue] = defaults[defaultValue];
              }
            }
          }

          if(attachedCallbacks.length > 0) {
            _.forEach(attachedCallbacks, function(callback) {
              callback();
            });
          }

          if(_.isFunction(callback)) {
            callback();
          }
        };

        scope.unregisterBroadcast = scope.$on('trigger-form-reset/' + controllers[0].$name, function(defaults, callback) {
          scope.resetForm(controllers[0].$name, defaults, callback);
        });
      }
    };
  }
]);
