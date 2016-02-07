app.controller("newPersonController", function ($rootScope, $scope, $http, $modalInstance, settings, loading, items) {

    $scope.errorDevice = false;
    $scope.newPerson = items.newPerson;

    $scope.personPhobias = [];
    $scope.personsPhobiaLabels = [];

    $scope.savePerson = function () {
        console.log(items);
        if (items.newPerson) {
          //  $scope.saveNewDevice();
        } else {
          //  $scope.editDevice();
        }
    }

    $scope.addPhobiaToPerson = function(phobia){
      $scope.personPhobias.push(phobia.phobia);
      $scope.personsPhobiaLabels.push(phobia.label);
    }


    // $scope.saveNewDevice = function () {
    //     loading.show();
    //     console.log($rootScope.deviceName, $rootScope.deviceOS, $rootScope.deviceOwner, $rootScope.deviceOthers);
    //
    //
    //     if ($scope.deviceName != undefined) {
    //         var device = {
    //             Name: $scope.deviceName,
    //             OperatingSystem: $scope.deviceOS,
    //             Owner: $scope.deviceOwner,
    //             Others: $scope.deviceOthers
    //         }
    //
    //         $http({
    //             method: 'POST',
    //             url: settings.BASE_API_URL + "api/device/PostDevice",
    //             data: angular.toJson(device, false)
    //         }).success(function (data) {
    //
    //             loading.hide();
    //             var device = {
    //                 Name: data.Name,
    //                 OperatingSystem: data.OperatingSystem,
    //                 Owner: data.Owner,
    //                 Others: data.Others
    //             }
    //             $rootScope.$emit("getDevice", data);
    //
    //             $scope.cancelDeviceModal();
    //
    //         }).error(function (reason) {
    //             loading.hide();
    //         });
    //     } else {
    //         loading.hide();
    //
    //         $scope.errorDevice = true;
    //         console.log($scope.error)
    //     }
    // }
    //
    //
    // $scope.editDevice = function () {
    //     console.log($rootScope.deviceID);
    //     loading.show();
    //
    //     if ($scope.deviceName != undefined) {
    //         var device = {
    //             DeviceId: items.deviceId,
    //             Name: $scope.deviceName,
    //             OperatingSystem: $scope.deviceOS,
    //             Owner: $scope.deviceOwner,
    //             Others: $scope.deviceOthers
    //         }
    //
    //         data = {
    //             id: items.deviceId,
    //             device: angular.toJson(device, false)
    //         }
    //
    //         $http({
    //             method: 'PUT',
    //             url: settings.BASE_API_URL + "api/device/PutDevice?id=" + items.deviceId + "&device=" + device,
    //             data: angular.toJson(device, false)
    //         }).success(function (data) {
    //
    //             loading.hide();
    //             var device = {
    //                 Name: data.Name,
    //                 OperatingSystem: data.OperatingSystem,
    //                 Owner: data.Owner,
    //                 Others: data.Others
    //             }
    //             $rootScope.$emit("getDevice", data);
    //
    //             $scope.cancelDeviceModal();
    //
    //         }).error(function (reason) {
    //             loading.hide();
    //         });
    //     } else {
    //         loading.hide();
    //
    //         $scope.errorDevice = true;
    //         console.log($scope.error)
    //     }
    // }

    $scope.cancelPersonModal = function () {
        $modalInstance.dismiss();
    }


});
