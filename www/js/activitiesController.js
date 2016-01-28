app.controller("activitiesController", function ($scope, $rootScope, $ionicModal) {
  console.log("activities contoller");
  $ionicModal.fromTemplateUrl('../views/web/newActivityModal.html', function($ionicModal) {
       $scope.modal = $ionicModal;
   }, {
       // Use our scope for the scope of the modal to keep it simple
       scope: $scope,
       // The animation we want to use for the modal entrance
       animation: 'slide-in-up'
   });
});
