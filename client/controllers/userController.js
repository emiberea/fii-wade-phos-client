app.controller("userController", function ($scope, $http, $rootScope, $modal, dalService) {
  $rootScope.data.logged = localStorage.getItem("logged");
  if($rootScope.data.logged){

    $rootScope.currentUser = angular.fromJson(localStorage.getItem("loggedUser"));
  }

  $scope.phobiaLabels = [];

  $scope.getPhobiaLabels = function(){
    var ids = $rootScope.currentUser.phobias;

    for(var i =0 ; i<ids.length; i++){
      var split = ids[i].split("#");
      var label = split[1].replace("_", " ");
      $scope.phobiaLabels.push(label);

    }
  }

  $scope.getPhobiaLabels();

});
