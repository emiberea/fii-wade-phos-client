// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


var app = angular.module('starter', ['ionic','ui.router'])
.run(function($ionicPlatform, $state, $rootScope) {
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
  // console.log(ionic.Platform.isWebView());
  // console.log(ionic.Platform.platform());
  $state.go('login');
  $rootScope.data = {
        logged: false,
        logout: function(){
          $rootScope.data.logged = false;
          localStorage.setItem('logged', false);
          $state.go('login');
        }
    }

   console.log(localStorage.getItem('logged'));
    if(localStorage.getItem('logged')=='true'){

      $rootScope.data.logged = true;
    }
});

app.config(function($stateProvider, $urlRouterProvider) {
  // var platform = ionic.Platform.platform();
  //     localStorage.setItem('path', 'web');
  //
  // if(platform.indexOf('iOS')>-1 || platform.indexOf('Android')>-1){
  //   localStorage.setItem('path', 'phone');
  // }
  // console.log(localStorage.getItem('path'));
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: '/views/web/login.html',
    controller: 'loginController'
  })
  .state('home',{
    url:'/home',
    templateUrl:function(){
      if(ionic.Platform.isAndroid() || ionic.Platform.isIOS()){
        return '/views/phone/home.html';
      }
      return '/views/web/home.html';
    },
    controller:'homeController'
  })
  .state('activities',{
    url:'/activities',
    templateUrl:function() {
      if (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {
          return  '/views/phone/activities.html';
      }
      return "/views/web/activities.html";
    },
    controller:'activitiesController'
  })
  .state('persons',{
    url:'/persons',
    templateUrl:function() {
      if (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {
          return  '/views/phone/persons.html';
      }
      return "/views/web/persons.html";
    },
    controller:'personsController'
  });
  $urlRouterProvider.otherwise('/login');

});
