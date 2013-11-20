/**
 * # Form Helper
 *
 * Provide functionality that makes it easier to work with forms.
 *
 * @module nag.form.helper
 * @ngdirective nagFormHelper
 */
angular.module('nag.form.helper', [])
.factory('nagFormHelper', [
  '$rootScope',
  function($rootScope) {
    return {
      /**
       * Resets all values for a form.
       *
       * @method reset
       *
       * @param {object} formController The form controller you want to reset
       * @param {object} [defaultValues] Key/Value pairing of default values to use when resetting the form, the key need to match the form input name
       */ 
      reset: function(formController, defaultValues) {
        for(var field in formController) {
          //make sure the property is a ngModelController
          if(formController[field].$name) {
            var modelValue = null;

            //figure out the default value if one is given
            if(defaultValues) {
              for(var defaultValue in defaultValues) {
                if(defaultValue === formController[field].$name && defaultValues[defaultValue]) {
                  modelValue = defaultValues[defaultValue];
                }
              }
            }

            //reset the value 
            formController[field].$setViewValue(modelValue);
            formController[field].$render();

            formController[field].$setPristine();
          }
        }

        formController.$setPristine();
        $rootScope.$broadcast('NagForm[' + formController.$name + ']/resetted', formController);
      }
    };
  }
]);
