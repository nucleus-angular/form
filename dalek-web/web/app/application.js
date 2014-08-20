angular.module('app', [
  'app.core',
  'app.home',
  'nag.form',
  'nag.tooltip'
])
.config([
  '$locationProvider',
  '$urlRouterProvider',
  function($locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/home');
  }
])
.value('nagFormInvalidIconPath', '/components/nucleus-angular-sass-framework/assets/svg/open-iconic/svg/x.svg')
.value('nagFormValidIconPath', '/components/nucleus-angular-sass-framework/assets/svg/open-iconic/svg/check.svg')
.run([
  '$state',
  '$rootScope',
  function($state, $rootScope) {
  }
]);
