app.controller('homeController',function ($rootScope, $scope, $state){
  if(!$rootScope.data.logged){
    $state.go('login');
  }

  $scope.showMenu = true;

});
