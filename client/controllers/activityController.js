app.controller("activityController", function ($scope, $http, $rootScope, $modal, dalService) {

  $rootScope.data.logged = localStorage.getItem("logged");
  if($rootScope.data.logged){

    $rootScope.loggedUser = localStorage.getItem("loggedUser");
  }
  $scope.newActivityModal = function (device) {
        var info;

        if (device == null) {
            info = {
                newDevice: true,
                deviceId: null
            }
            $rootScope.name = undefined;
            $rootScope.description = undefined;

        } else {
            info = {
                newDevice: false,
                deviceId: device.DeviceId
            }
        }

        var modalInstance = $modal.open({
            templateUrl: '../views/modals/activityModal.html',
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
