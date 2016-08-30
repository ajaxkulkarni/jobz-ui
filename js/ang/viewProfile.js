angular.module("app").controller('viewProfile', function ($scope, userService, $http) {
    
    if(localStorage.user == null) {
        window.location.href = "index.html";
        return;
    }
    
    if (localStorage != null && localStorage.viewProfile != null) {
        $scope.user = JSON.parse(localStorage.viewProfile);
        var user = JSON.parse(localStorage.user);
        //alert(user.email);
        $scope.user.email = user.email;
        $scope.user.name = user.name;
        $scope.user.password = user.password;
        $scope.user.phone = user.phone;
    }

    $scope.saveProfile = function () {
        userService.update($scope).then(function (response) {
            if (response.status != 200) {
                $scope.postJobResponse = response.responseText;
                //alert($scope.loginResponse);
                return;
            }
            window.location.href = "dashboard.html";
        });
    };

});