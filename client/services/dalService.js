app.service("dalService", function ($http, $rootScope, settings, loading) {

    //devices
    this.getDevices = function (succes, error) {
        getCall(settings.BASE_API_URL + "api/device/GetDevices", succes, error);
    };

    //logs
    this.getLogs = function (success, error) {
        getCall(settings.BASE_API_URL + "api/log/GetLogs", success, error);
    }

    this.postLogs = function (arguments, success, error) {
        postCall(settings.BASE_API_URL + "api/log/PostLog", arguments, success, error);
    };

    this.returnDevice = function (arguments, success, error) {
        putCall(settings.BASE_API_URL + "api/log/ReturnDevice?deviceId=" + arguments, success, error);
    };

    //persons
    this.getPersons = function (success, error) {
        getCall(settings.BASE_API_URL + "api/person/Get", success, error)
    }

    this.login = function (arguments, success, error) {        
        postCall(settings.BASE_API_URL + "api/person/enter", arguments, success, error)
    }

    
    var getCall = function(url, success, error){
        loading.show();

        $http({
            method: "GET",
            url: url

        }).success(function (data) {
            loading.hide();
         //   console.log("Data from success", data);
            success(data);

        }).error(function (data) {
            loading.hide();
            error(data);
        });
    };

    var postCall = function (url, arguments, success, error) {
        loading.show();

        $http({
            method: "POST",
            url: url,
            data: arguments
        }).success(function (data) {
            loading.hide();
            success(data);
        }).error(function (data) {
            loading.hide();
            error(data);
        });

    };

    var putCall = function (url, arguments, success, error) {
        loading.show();

        $http({
            method: "PUT",
            url: url,
            data: arguments
        }).success(function (data) {
            loading.hide();
            success(data);
            console.log("PUT SUCCESS");
        }).error(function (data) {
            loading.hide();
            error(data);
            console.log("PUT ERROR");
        });

    };
});
