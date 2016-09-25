angular.module("app").controller('confirmJob', function ($scope, jobService,userService, $http) {
    //alert("Posting new Job");
    if (localStorage.user == null) {
        window.location.href = "index.html";
        return;
    }

    $scope.loggedIn = JSON.parse(localStorage.user);

    if ($scope.loggedIn == null) {
        window.location.href = "index.html";
        return;
    }

    $.skylo({
        state: 'success',
        inchSpeed: 200,
        initialBurst: 30,
        flat: false
    });

    if (localStorage.user == null) {
        window.location.href = "index.html";
        return;
    }

    if (localStorage != null && localStorage.postJob != null) {
        $scope.job = JSON.parse(localStorage.postJob);
        $scope.job.intent = $scope.loggedIn.type;
    }

    $scope.postJob = function () {
        $.skylo('start');
        $.skylo('inch', 5);
        if ($scope.job.id != null && $scope.job.id > 0) {
            jobService.updateJob($scope).then(function (response) {
                $.skylo('end');
                if (response.status != 200) {
                    $scope.postJobResponse = response.responseText;
                    //alert($scope.loginResponse);
                    return;
                }
                localStorage.postJob = null;
                localStorage.viewType = "PostedJobs";
                //window.location.href = "dashboard.html";
                window.location.replace("dashboard.html");
            });
        } else {
            jobService.postJob($scope).then(function (response) {
                $.skylo('end');
                if(response == null) {
                    $scope.postJobResponse = "Error connecting server ..";
                    return;
                }
                
                if (response.status != 200) {
                    $scope.postJobResponse = response.responseText;
                    //alert($scope.loginResponse);
                    return;
                }
                localStorage.postJob = null;
                localStorage.viewType = "PostedJobs";
                //window.location.href = "dashboard.html";
                window.location.replace("dashboard.html");
            });
        }


    };
    
    $scope.back = function() {
        window.location.replace("postJob.html");  
    };
    
    $scope.logout = function () {
        userService.logout();
    };

});