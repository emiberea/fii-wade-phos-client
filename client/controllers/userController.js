app.controller("userController", function ($scope, $http, $rootScope, $modal, dalService) {
  $rootScope.data.logged = localStorage.getItem("logged");
  if($rootScope.data.logged){
    $rootScope.currentPersons = angular.fromJson(localStorage.getItem("currentPersons"));
    $rootScope.currentUser = angular.fromJson(localStorage.getItem("loggedUser"));
  }

  $scope.phobiaLabels = [];
  $scope.userPhobiasInfo = [];

  $scope.getPhobiaLabels = function(){
    var phobias = $rootScope.currentUser.phobias;

    for(var i =0 ; i<phobias.length; i++){
      // var split = phobias[i].label.split("#");
      // var label = split[1].replace("_", " ");
      $scope.phobiaLabels.push(phobias[i].label);

    }
  }

  $scope.getPhobiasInfo = function(){
    var phobias = $rootScope.currentUser.phobias;
    for(var i=0; i<phobias.length; i++){

      console.log(phobias[i].id);
      getPhobiaById(phobias[i].id);
    }
  };

  function getPhobiaById(id){
    var phobias = angular.fromJson(localStorage.getItem("phobias"));

    for(var i=0; i<phobias.length; i++){
    //  console.log(phobias[i].phobia);
      if(phobias[i].phobia == id){
        $scope.userPhobiasInfo.push(phobias[i]);

        console.log($scope.userPhobiasInfo);
        break;
      }
    }
  }

//  $scope.getPhobiaLabels();
  $scope.getPhobiasInfo();

});
