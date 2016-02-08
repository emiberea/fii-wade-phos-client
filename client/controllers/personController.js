app.controller("personController", function ($scope, $http, $rootScope, $modal, dalService) {
  $rootScope.data.logged = localStorage.getItem("logged");
  if($rootScope.data.logged){

    $rootScope.currentUser = angular.fromJson(localStorage.getItem("loggedUser"));
    $rootScope.currentPersons = angular.fromJson(localStorage.getItem("currentPersons"));
  }
  $scope.newPersonModal = function (person) {
        var info;

        if (person == null) {
            info = {
                newPerson: true,
                personId: null
            }
            $rootScope.personName = undefined;

        } else {
            info = {
                newPerson: false,
                personId: person.id
            }
        }

        var modalInstance = $modal.open({
            templateUrl: '../views/modals/personModal.html',
            controller: 'newPersonController',
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
