app.controller("newPersonController", function ($rootScope, $scope, $http, $modalInstance, settings, loading, items) {

    $scope.errorDevice = false;
    $scope.newPerson = items.newPerson;

    $scope.personPhobias = [];
    $scope.personsPhobiaLabels = [];
    $scope.savePerson = function () {
        console.log(items);
        if (items.newPerson) {
          $scope.saveNewPerson();
        } else {
          //  $scope.editPerson();
        }
    }

    $scope.addPhobiaToPerson = function(phobia){
      $scope.personPhobias.push(phobia.phobia);
      $scope.personsPhobiaLabels.push(phobia.label);
    }


    $scope.saveNewPerson =function(){
      var email = $rootScope.currentUser.email;
      loading.show();
      $http({
          method: "POST",
          url: settings.BASE_API_URL + "persons/" + email,
          headers:{
            'Access-Control-Allow-Origin': "*",
            'Content-type':'application/json'
          },
          data: {
            "name":$scope.personName,
            "phobias":  $scope.personPhobias
          }
      }).success(function (data) {
        // console.log(data);
        var newPerson = data.data,
            newPhobiaArray = [];
          for(var i=0; i<newPerson.phobias.length; i++){
              //a =;
              //b = (a);
              newPhobiaArray.push({
                  'label':  newPerson.phobias[i].split("#")[1],
                  'id': newPerson.phobias[i]
              });
          }

        newPerson.phobias = newPhobiaArray;
        $rootScope.currentPersons.push(newPerson);
        localStorage.setItem("currentPersons", angular.toJson($rootScope.currentPersons));
        loading.hide();
        $scope.cancelPersonModal();
      }).error(function(data){
        // console.log(data);
        loading.hide();
      });
    }

    $scope.cancelPersonModal = function () {
        $modalInstance.dismiss();
    }


});
