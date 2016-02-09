app.controller("newActivityController", function ($rootScope, $scope, $http, $modalInstance, settings, loading, items) {

  $rootScope.data.logged = localStorage.getItem("logged");
  if($rootScope.data.logged){
    $rootScope.currentUser = angular.fromJson(localStorage.getItem("loggedUser"));
    $rootScope.currentPersons = angular.fromJson(localStorage.getItem("currentPersons"));
  }
  $scope.errorDevice = false;
  $scope.newDevice = items.newDevice;
  $scope.activityPersons = [];
  $rootScope.remedies = [];
  $rootScope.symptoms =[];

  $scope.saveActivity = function () {
      console.log(items);
      if (items.newActivity) {
          $scope.saveNewActivity();
      } else {
        //  $scope.editActivity();
      }
  }

  $scope.saveNewActivity = function(){
    var description = $scope.description.toLowerCase(),
        activities = getActivities(description),
        phobias = getPhobiasFromPersons(),
        sendToServer = [];
    $rootScope.symptoms =[];
    console.log("activities", activities);
    console.log("phobias", phobias);
    loading.show();
    for(var i =0; i<phobias.length; i++){
      for(var j =0; j<activities.length; j++){
        sendToServer.push({
          "phobia": phobias[i],
          "activity": activities[j]
        });
      }
      getSymptoms(phobias[i]);
    }

    console.log(sendToServer);
    getRemedies(sendToServer);

  }

  $scope.addPersonToActivity = function(person){
    $scope.activityPersons.push(person);
  }

  $scope.removePersonFromActivity = function(index){
    $scope.activityPersons.splice(index, 1);
  }

  function getActivities(description){
    console.log("entering here")
    var activities = [""];
    if(description.indexOf('flying')>-1 || description.indexOf('plane')>-1 || description.indexOf('helicopter')>-1 ){
      activities.push("Flying");
    }
    if(description.indexOf('driving')>-1 || description.indexOf('drive')>-1 || description.indexOf('car')>-1){
      activities.push("Driving");
    }
    if(description.indexOf('cruse')>-1 || description.indexOf('crusing')>-1 || description.indexOf('ship')>-1){
      activities.push("Crusing");
    }
    if(description.indexOf('bus')>-1 || description.indexOf('car')>-1){
      activities.push("BusTravel");
    }
    if(description.indexOf('mountain')>-1 || description.indexOf('climb')>-1 || description.indexOf('hike')>-1 ||
      description.indexOf('hiking')>-1 || description.indexOf('climbing')>-1 ){
        activities.push("Mountain");
    }
    if(description.indexOf('window')>-1 || description.indexOf('restaurant')>-1 || description.indexOf('lunch')>-1
    || description.indexOf('dinner')>-1 || description.indexOf('brunch')>-1 || description.indexOf('eat')>-1){
      activities.push("restaurant");
    }

    if(description.indexOf('empire')>-1 || description.indexOf('Empire state')>-1 || description.indexOf('building')>-1){
      activities.push("empireStateBuilding");
    }

    if(description.indexOf('science')>-1 || description.indexOf('museum')>-1 || description.indexOf('robots')>-1){
      activities.push("scienceMuseum");
    }

    if(description.indexOf('theatre')>-1 || description.indexOf('show')>-1 ){
      activities.push("theatre");
    }
    if(description.indexOf('wax')>-1 || description.indexOf('tussauds')>-1 ){
      activities.push("MadameTussauds");
    }
    if(description.indexOf('dance')>-1 || description.indexOf('dancing')>-1 || description.indexOf('party')>-1
    || description.indexOf('parting')>-1 || description.indexOf('wedding')>-1){
      activities.push("dance");
    }
    return activities;
  }

  function getPhobiasFromPersons(){
    var phobias = [],
        user = $rootScope.currentUser,
        persons = $scope.activityPersons;
    console.log(persons)
    for(var i =0; i<user.phobias.length; i++){
      if(phobias.indexOf(user.phobias[i].id) ==-1)
        phobias.push(user.phobias[i].id);
    }

    for(var j=0; j<persons.length; j++){
      console.log(persons[j])
      for(var k=0; k<persons[j].phobias.length; k++){
        console.log(persons[j].phobias)
        if(phobias.indexOf(persons[j].phobias[k].id) ==-1)
          phobias.push(persons[j].phobias[k].id);
      }
    }
    return phobias;
  }

  function getRemedies(sendToServer){
    $rootScope.remedies = [];
    $http({
        method: "POST",
        url: settings.BASE_API_URL + "remedies" ,
        headers:{
          'Access-Control-Allow-Origin': "*",
          'Content-type':'application/json'
        },
        data: sendToServer
    }).success(function (data) {
      console.log(data);
      var info = data.data;
      for(var i = 0; i < info.length; i++){
        var currentLabel = info[i].phobia.split("#")[1],
            newLabel = true;
        if(info[i].description.length>0){
          for(var j =0; j< $scope.remedies.length;j++){
            if($rootScope.remedies[j]){
              if($rootScope.remedies[j].label == currentLabel){
                $rootScope.remedies[j].descriptions = ($rootScope.remedies[j].descriptions).concat(info[i].description);

                newLabel = false;
                break;
              }
            }
          }
          if(newLabel){
            $rootScope.remedies.push({
              "label": currentLabel,
              "descriptions": info[i].description
            });
          }
        }
      }
      console.log($scope.remedies);
      loading.hide();
      $scope.cancelActivityModal();
    }).error(function(data){
     // alert("An error has occured");
      loading.hide();
    });
  };

  function getSymptoms(phobia){
   if(phobia){

     var label = phobia.split("#")[1];
   }
    $http({
        method: "GET",
        url: settings.BASE_API_URL + "symptoms/" + label ,
        headers:{
          'Access-Control-Allow-Origin': "*",
          'Content-type':'application/json'
        }
    }).success(function (data) {
      console.log(data.data);
      // var newSympthom = true;
      //
      // for(var i = 0; i<$rootScope.symptoms.length;i++){
      //   if($rootScope.symptoms[i].label == label{
      //     $rootScope.symptoms[i].label = $rootScope.symptoms[i].label.concat(data.data);
      //   }
      // }

      //if(newLabel){
        $rootScope.symptoms.push({
          "label": label,
          "descriptions": data.data
        });
      //}

    }).error(function(data){
      alert("An error has occured");
    });
  }

  $scope.cancelActivityModal = function () {
      $modalInstance.dismiss();
  }


});
