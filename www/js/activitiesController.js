app.controller("activitiesController", function ($rootScope, $scope, $state, $ionicModal) {
  console.log("activities contoller");

  if(!$rootScope.data.logged){
    $state.go('login');
  }
  $ionicModal.fromTemplateUrl('../views/web/newActivityModal.html', function($ionicModal) {
       $scope.newActivityModal = $ionicModal;
   }, {
       // Use our scope for the scope of the modal to keep it simple
       scope: $scope,
       // The animation we want to use for the modal entrance
       animation: 'slide-in-up'
   });

   $ionicModal.fromTemplateUrl('../views/web/sugestionModal.html', function($ionicModal) {
        $scope.sugestionModal = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });
});
