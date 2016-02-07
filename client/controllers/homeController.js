app.controller("homeController", function ($scope, $rootScope, $http, $modal,$location, $state, dalService ) {
  $rootScope.data.logged = localStorage.getItem("logged");

  if($rootScope.data.logged){
    $rootScope.loggedUser = localStorage.getItem("loggedUser");
  }

  $scope.goToActivities = function(){
    $state.go("/activities");
  };

  $scope.goToPersons = function(){
    $state.go("/persons");
  };

  $scope.goToUser = function(){
    $state.go('/user');
  }

  $scope.loggout = function(){
    $rootScope.data.logged = false;
    $state.go("/")
  }

//     $scope.deviceList = [];
//     $scope.oneAtATime = true;
//     $scope.device;
//     $scope.logList;
//     $scope.orderByField = "td";
//     $scope.reverseSort = true;
//     $scope.alertList = [];
//     $scope.admin = false;
//
//     $http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
//
//
//     $scope.getDevices = function () {
//         dalService.getDevices(function (data) {
//            // console.log("DATA", data);
//             $scope.deviceList = data;
//
//             $scope.getPersons();
//         }, function (data) {
//             console.log("ERROR getting devices");
//         });
//     };
//
//     $scope.getPersons = function () {
//         dalService.getPersons(function (data) {
//             $scope.persons = data;
//             $scope.getLogs();
//         }, function (data) {
//             console.log("ERROR getting persons");
//         });
//     };
//
//     $scope.getDevices();
//     $scope.getPersons();
//
//     $scope.log = function () {
//         console.log($scope.orderByField);
//         console.log($scope.reverseSort);
//     }
//
//     var deviceGet = $rootScope.$on("getDevice", function (event, data) {
//         $scope.getDevices();
//     });
//
//     var logGet = $rootScope.$on("getLog", function (event, data) {
//         $scope.getLogs();
//     });
//
//
//     $rootScope.$on('$destroy', function () {
//         deviceGet();
//     });
//
//
//     $scope.showModal = false;
//     $scope.toggleModal = function () {
//         $scope.showModal = !$scope.showModal;
//     };
//
//     $scope.openAddDeviceModal = function (device) {
//         var info;
//
//         if (device == null) {
//             info = {
//                 newDevice: true,
//                 deviceId: null
//             }
//             $rootScope.deviceName = undefined;
//             $rootScope.deviceOS = undefined;
//             $rootScope.deviceOwner = undefined;
//             $rootScope.deviceOthers = undefined;
//
//         } else {
//             info = {
//                 newDevice: false,
//                 deviceId: device.DeviceId
//             }
//         }
//
//         var modalInstance = $modal.open({
//             templateUrl: '../views/modals/deviceModal.html',
//             controller: 'modalController',
//             //size: "sm",
//             backdrop: 'static',
//             resolve: {
//                 items: function () {
//                     return info;
//                 }
//             }
//         });
//     };
//
//
//     $scope.getLogs = function () {
//         dalService.getLogs(function (data) {
//             $scope.logList = data;
//
//             for (var i = 0; i < data.length; i++) {
//                 var deviceId = data[i].deviceId,
//                     device = getDeviceById(deviceId),
//                     personData = getPersonByUsername(data[i].personId),
//                     td = new Date(data[i].takenDetails),
//                     rd = new Date(data[i].returnDetails);
//
//                 $scope.logList[i].device = device;
//                 $scope.logList[i].person = personData;
//                 $scope.logList[i].td = td.toLocaleDateString();
//                 $scope.logList[i].th = td.toLocaleTimeString();
//                 $scope.logList[i].rd = rd.toLocaleDateString();
//                 $scope.logList[i].rh = rd.toLocaleTimeString();
//                 $scope.logList[i].bookedDate = td;
//             }
//
//           //  console.log($scope.logList);
//             $scope.getAlerts();
//         }, function (data) {
//             console.log("ERROR LOGS")
//         });
//     };
//
//     var getDeviceById = function (id) {
//         var list =$scope.deviceList;
//         for (var i = 0; i < list.length; i++) {
//             if (list[i].device.DeviceId == id) {
//                 return list[i].device;
//             }
//         }
//         return null;
//     };
//
//     var getPersonByUsername = function (username) {
//         var list = $scope.persons;
//         for (var i = 0; i < list.length; i++) {
//             if (list[i].Username == username) {
//                 return list[i];
//             }
//         }
//         return null;
//     }
//
//     var currentDate = new Date();
//
//     var addAllert = function (alert) {
//         $scope.alertList.push(alert);
//     }
//
//
//
//     $scope.filterAlerts = function (element) {
//
//         //var devices = $scope.deviceList,
//         //    logs = $scope.logList,
//         //    currentDate = new Date(),
//         //    alerts = [];
//
//      //  console.log("element:", element);
//        if (element) {
//            if (!element.returned) {
//                var logDate = element.returnDetails.replace("T", " ");
//                if (currentDate > new Date(logDate)) {
//                  //  ilie++;
//
//                    //addAllert(element);
//                    //logs[j].notShow = true;
//                    //console.log("not returned", element);
//                 //   console.log(ilie);
//                    return false;
//                } else {
//                    return true;
//                }
//            } else {
//                return true;
//            }
//        }
//       //  $scope.alertList = alerts;
//         //console.log($scope.alertList);
//
//         //for (var j = 0; j < logs.length; j++) {
//         //    if (!logs[j].returned) {
//         //        var logDate = logs[j].returnDetails.replace("T", " ");
//         //        if (currentDate > new Date(logDate)) {
//
//         //            alerts.push(logs[j]);
//         //            logs[j].notShow = true;
//         //            console.log("not returned", logs[j]);
//         //        }
//         //    }
//         //}
//
//         //$scope.alertList = alerts;
//         //console.log($scope.alertList);
//     }
//
//
//
//     $scope.getAlerts = function () {
//         var devices = $scope.deviceList,
//             logs = $scope.logList,
//             currentDate = new Date(),
//             alerts = [];
//
//
//         for (var j = 0; j < logs.length; j++) {
//             if (!logs[j].returned) {
//                 var logDate = logs[j].returnDetails.replace("T", " ");
//                 if (currentDate > new Date(logDate)) {
//
//                     alerts.push(logs[j]);
//                     logs[j].notShow = true;
//                 }
//             }
//         }
//
//         $scope.alertList = alerts;
//     }
//
//     $scope.editDevice = function (device) {
//         $rootScope.deviceID = device.DeviceId;
//         $rootScope.deviceName = device.Name;
//         $rootScope.deviceOS = device.OperatingSystem;
//         $rootScope.deviceOwner = device.Owner;
//         $rootScope.deviceOthers = device.Other;
//
//         $scope.openAddDeviceModal(device);
//     }
//
//     $scope.checkLogged = function () {
//         var response = $rootScope.data.response;
//         if (response != null) {
//             $rootScope.data.admin = true;
//         }
//
//         var logged = localStorage.getItem("logged");
//         if (!logged) {
//             //$location.path("/");
//             $state.go("/");
//             $rootScope.data.logged = false;
//         } else {
//             $rootScope.data.logged = true;
//         }
//     }
//
//     $scope.checkLogged();
//
//
//     $scope.deleteDevice = function (deviceId) {
//         var myModal = $modal.open({
//             templateUrl: '../views/modals/confirmModal.html',
//             controller: 'confirmDeleteController',
//             //size: "sm",
//             backdrop: 'static',
//             resolve: {
//                 info: function () {
//                     return {
//                         message: "Are you sure you want to delete this device?",
//                         deviceId: deviceId
//                     }
//                 }
//             }
//         });
//     }
//
//     //reading the file
//     //$http.get("resources/data/devices.json")
//     //    .success(function (data) {
//
//     //        $scope.deviceList = data;
//     //    })
//     //    .error(function (data, status, headers, config) {
//
//     //        console.log("ERROR");
//     //    });
//
// });
//
// app.controller("confirmDeleteController", function ($scope, $http, $modalInstance, $rootScope, info, settings, loading) {
//     $scope.message = info.message;
//
//
//     $scope.confirmCancel = function () {
//         $modalInstance.dismiss();
//     }
//
//     $scope.confirmDelete = function () {
//         loading.show();
//         $http({
//             method: 'Delete',
//             url: settings.BASE_API_URL + "api/device/DeleteDevice?id=" + info.deviceId
//           //  data: angular.toJson(device, false)
//         }).success(function (data) {
//
//             loading.hide();
//
//             $rootScope.$emit("getDevice", data);
//
//             $scope.confirmCancel();
//
//         }).error(function (reason) {
//             loading.hide();
//         });
//
//     }
});
