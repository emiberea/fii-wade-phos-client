var app = angular.module('DeviceManager', ['ui.bootstrap', 'ui.router', 'ngRoute'])
                 .filter("toArray", function () {
                     return function (obj) {
                         var result = [];
                         angular.forEach(obj, function (val, key) {
                             result.push(val);
                         });
                         return result;
                     }
                 });
app.run(function ($rootScope) {
    $rootScope.data = {
        admin: false,
        logged: false,
        response: "",
        newDevice: false
    }
});


app.config(function ($routeProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('/', {
            url: '/',
            templateUrl: 'views/login.html',
            controller: "loginController"
        })
        .state('/register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: "loginController"
        })
        .state('/home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: "homeController"
        })
        .state('/user', {
            url: '/user',
            templateUrl: 'views/user.html',
            controller: "loginController"
        })
        .state('/activities', {
            url: '/activities',
            templateUrl: 'views/activities.html',
            controller: "activityController"
        }).state('/persons', {
            url: '/persons',
            templateUrl: 'views/persons.html',
            controller: "personController"
        });

    $urlRouterProvider.otherwise('/');

    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: false
    //});

    //$routeProvider
    //    .when("/", {
    //        templateUrl: "views/login.html",
    //        controller: "loginController"
    //    })
    //    .when("/main", {
    //        templateUrl: "views/main.html",
    //        controller: "mainController"
    //    })
    //    .otherwise({ redirectTo: "/" });
});

app.service("settings", function () {
    this.BASE_API_URL = "http://dev.phos.com/app_dev.php/api/";
});

app.service('loading', function () {
    this.show = function () {
        $('#loadingDiv').show();
    };
    this.hide = function () {
        $('#loadingDiv').hide();
    };
});


app.factory("Data", function () {

    var sharedService = {};

    sharedService.deviceList = [];

    return sharedService;
});
