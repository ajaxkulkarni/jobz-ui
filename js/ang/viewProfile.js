angular.module("app").controller('viewProfile', function ($scope, userService, $http) {

    //alert("Here!");

    /*if (localStorage.user == null) {
        window.location.href = "index.html";
        return;
    }

    $scope.loggedIn = JSON.parse(localStorage.user);



    if ($scope.loggedIn == null) {
        window.location.href = "index.html";
        return;
    }*/
    
    userService.validateUser($scope);


    $.skylo({
        state: 'success',
        inchSpeed: 200,
        initialBurst: 30,
        flat: false
    });

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
        $.skylo('start');
        $.skylo('inch', 5);
        userService.update($scope).then(function (response) {
            $.skylo('end');
            //alert(JSON.stringify(response));
            if (response == null) {
                $scope.profileResponse = "Error connecting server ..";
                return;
            }

            if (response.status != 200) {
                $scope.profileResponse = response.responseText;
                //alert($scope.loginResponse);
                return;
            }
            if(localStorage.applyJob != null && localStorage.applyJob != 'null') {
                window.location.href = "applyJob.html";
                return;
            }
            window.location.href = "dashboard.html";
        });
    };

    $scope.back = function () {
        window.location.replace("updateProfile.html");
    };

    $scope.logout = function () {
        userService.logout();
    };

});