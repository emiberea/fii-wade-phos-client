app.controller('homeController',function ($scope, $rootScope, $state){
  $scope.goToActivities = function(){
    console.log("GOTO")
    $state.go('activitiesWeb');
  }
});
