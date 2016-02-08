app.controller("activityController", function ($scope, $http, $rootScope, $modal, dalService) {

  $rootScope.data.logged = localStorage.getItem("logged");
  if($rootScope.data.logged){
    $rootScope.currentUser = angular.fromJson(localStorage.getItem("loggedUser"));
    $rootScope.currentPersons = angular.fromJson(localStorage.getItem("currentPersons"));
  }

  $scope.newActivityModal = function (activity) {
        var info;

        if (activity == null) {
            info = {
                newActivity: true,
                activityId: null
            }
            $rootScope.name = undefined;
            $rootScope.description = undefined;

        } else {
            info = {
                newActivity: false,
                activityId: activityId.id
            }
        }

        var modalInstance = $modal.open({
            templateUrl: '../views/modals/newActivityModal.html',
            controller: 'newActivityController',
            //size: "sm",
            backdrop: 'static',
            resolve: {
                items: function () {
                    return info;
                }
            }
        });
    };

});
