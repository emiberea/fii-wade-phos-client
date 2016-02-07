app.controller("panelController", function ($scope, $http, $rootScope, dalService) {
    $scope.tab = 1;
    $scope.takenTime = new Date();
    $scope.returnTime = new Date();
    $scope.seeHours = false;


    $scope.selectTab = function (setTab) {
        $scope.tab = setTab;
    }

    $scope.isSelected = function (checkTab) {
        return $scope.tab === checkTab;
    }

    var emptyForm = {
        device: "",
        person: "",
        takenDate: new Date().toLocaleDateString(),
        returnDate: new Date().toLocaleDateString(),
        takenTime: new Date(),
        returnTime: new Date(),
        cable: null
    };
    

    //Date picker and time picker
    $scope.format = 'dd.MM.yyyy';
    $scope.person;

    $scope.today = function () {
        var dt= (new Date());
        $scope.takenDate = dt.toLocaleDateString();
        $scope.returnDate = dt.toLocaleDateString();

        //$scope.takenTime;
        //$scope.returnTime;
    };

    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };
           

    $scope.openDatepicker = function ($event, fromTaken) {
        $event.preventDefault();
        $event.stopPropagation();

        if (fromTaken) {
            $scope.openedTaken = true;
            $scope.opened = false;
        }
        else {
            $scope.opened = true;
            $scope.openedTaken = false;
        }
    };
        
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    //submit form
    $scope.submit = function () {
        console.log($scope.td);
        var td = $scope.takenDate,
            tt = $scope.takenTime,
            rd = $scope.returnDate,
            rt = $scope.returnTime;

        if (typeof td == "string") {
            td = convertStringToDate(td);
        }
        if (typeof rd == "string") {
            rd = convertStringToDate(rd);
        }

        var takenDateTime = new Date(td.getFullYear(), td.getMonth(), td.getDate(), tt.getHours(), tt.getMinutes()),
            returnDateTime = new Date(rd.getFullYear(), rd.getMonth(), rd.getDate(), rt.getHours(), rt.getMinutes());

        if (!$scope.cable) $scope.cable = false;
        console.log($scope.device.device.DeviceId);
        var log = {
            deviceId: $scope.device.device.DeviceId,
            personId: $scope.person.Username,
            takenDetails: takenDateTime,
            returnDetails: returnDateTime,
            cable: $scope.cable,
            returned:false
        }

        dalService.postLogs(log, function (data) {
            console.log("POST LOG", data);
            $rootScope.$emit("getLog", data);
            $rootScope.$emit("getDevice");
            resetForm();
        });
    }

    $scope.resetReturn = function () {
        var rt = $scope.returnDate;
        
        if (typeof $scope.returnDate == "string") {
           
            rt = convertStringToDate(rt);
        }
        if (rt < $scope.takenDate) {
            
            $scope.returnDate = $scope.takenDate.toLocaleDateString();
        }
    };

    var resetForm = function () {
        $scope.device = emptyForm.device;
        $scope.person = emptyForm.person;
        $scope.takenDate = emptyForm.takenDate;
        $scope.returnDate = emptyForm.returnDate;
        $scope.cable = emptyForm.cable;
        $scope.takenTime = emptyForm.takenTime;
        $scope.returnTime = emptyForm.returnTime;
    }

    var convertStringToDate = function (stringDate) {
        var pattern = /(\d{2})\.(\d{2})\.(\d{4})/,
            stringToDate = new Date(stringDate.replace(pattern, '$3-$2-$1'));

        return stringToDate;
    }

    $scope.returnDevice = function (deviceId) {
        console.log(deviceId);
        dalService.returnDevice(deviceId, function (data) {
            console.log("SUCCESS", data);
            $rootScope.$emit("getLog", data);
            $rootScope.$emit("getDevice");
        }, function (data) {
            console.log("FAILURE", data);
            $rootScope.$emit("getLog", data);
            $rootScope.$emit("getDevice");
        });

        
    }
});