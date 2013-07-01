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
          this.addCallback = function(callback) {
            attachedCallbacks.push(callback);
          };

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
