// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


var app = angular.module('starter', ['ionic','ui.router'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  // var platform = ionic.Platform.platform();
  //     $scope.path = 'web';
  //
  // if(platform.indexOf('iOS')>-1 || platform.indexOf('Android')>-1){
  //   $scope.path='phone';
  // }

  //  console.log($rootScope.path);
});

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('menu', {
    url: '/',
    controller: 'homeController'
  })
  .state('activities',{
    url:'/activities',
    templateUrl:'/views/web/activities.html',
    controller:'activitiesController'
  })
  .state('persons',{
    url:'/persons',
    templateUrl:'/views/web/persons.html',
    controller:'personsController'
  });
  $urlRouterProvider.otherwise('/');

});
