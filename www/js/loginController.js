app.controller('loginController',function ($rootScope, $scope, $rootScope, $state){
//  $scope.showMenu = false;

  $scope.login = function(){
    console.log("GOTO")
    $state.go('home');
    $rootScope.data.logged = true;
    localStorage.setItem('logged', true);
  }
});
