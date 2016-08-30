angular.module("app").controller('confirmJob', function ($scope, jobService, $http) {
    
    if(localStorage.user == null) {
        window.location.href = "index.html";
        return;
    }
    
    if (localStorage != null && localStorage.postJob != null) {
        $scope.job = JSON.parse(localStorage.postJob);
    }

    $scope.postJob = function () {
        jobService.postJob($scope).then(function (response) {
            if (response.status != 200) {
                $scope.postJobResponse = response.responseText;
                //alert($scope.loginResponse);
                return;
            }
            window.location.href = "dashboard.html";
        });
    };

});