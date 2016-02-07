app.controller("userController", function ($scope, $http, $rootScope, $modal, dalService) {
  $rootScope.data.logged = localStorage.getItem("logged");
  if($rootScope.data.logged){

    $rootScope.currentUser = angular.fromJson(localStorage.getItem("loggedUser"));
  }

  $scope.phobiaLabels = [];
  $scope.userPhobiasInfo = [];

  $scope.getPhobiaLabels = function(){
    var ids = $rootScope.currentUser.phobias;

    for(var i =0 ; i<ids.length; i++){
      var split = ids[i].split("#");
      var label = split[1].replace("_", " ");
      $scope.phobiaLabels.push(label);

    }
  }

  $scope.getPhobiasInfo = function(){
    var ids = $rootScope.currentUser.phobias;
console.log(ids);
    for(var i=0; i<ids.length; i++){

  console.log(ids[i]);
      getPhobiaById(ids[i]);
    }
  };

  function getPhobiaById(id){
    var phobias = angular.fromJson(localStorage.getItem("phobias"));

    for(var i=0; i<phobias.length; i++){
      console.log(phobias[i].phobia);
      if(phobias[i].phobia == id){
        $scope.userPhobiasInfo.push(phobias[i]);

        console.log($scope.userPhobiasInfo);
        break;
      }
    }
  }

  $scope.getPhobiaLabels();
  $scope.getPhobiasInfo();

});
