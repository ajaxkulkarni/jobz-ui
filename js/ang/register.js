angular.module("app").controller('register', function ($scope, userService) {

    $scope.loggedIn = null;
    if (localStorage.user != null) {
        $scope.loggedIn = JSON.parse(localStorage.user);
        //alert($scope.loggedIn.email);
    }
    //alert($scope.loggedIn.email);
    //alert("Here!");
    $scope.user = {};
    $scope.response = {};
    $scope.loginResponse = null;
    $scope.registerResponse = null;
    $scope.showProgress = false;

    $.skylo({
        state: 'success',
        inchSpeed: 200,
        initialBurst: 30,
        flat: false
    });


    $scope.registerUser = function (formValid) {
        if(!formValid) {
            $scope.registerShowErrors = true;
            return;
        }
        
        if($scope.user.password != $scope.user.confirmPassword) {
            $scope.registerShowErrors = true;
            $scope.registerForm.cpassword.$invalid = true;
            return;
        }
        
        $scope.showProgress = true;
        $.skylo('start');
        $.skylo('inch', 5);
        if($scope.user.type == null) {
            $scope.user.type = localStorage.intent;
        }
        userService.register($scope).then(function (response) {
            $.skylo('end');
            $scope.showProgress = false;
            if (response == null) {
                $scope.registerResponse = "Error connecting server ..";
            }
            if (response.status != 200) {
                $scope.registerResponse = response.responseText;
                return;
            }
            postLogin($scope);
        });

    };

    //alert(localStorage.intent);
    $scope.selectIntent = function (intent) {
        localStorage.intent = intent;
        //alert(localStorage.intent);
        if ($scope.loggedIn != null) {
            $.skylo('start');
            $.skylo('inch', 5);
            userService.update($scope).then(function (response) {
                $.skylo('end');
                //alert(JSON.stringify(response));
                if (response.status != 200) {
                    $scope.updateResponse = response.responseText;
                    //alert($scope.loginResponse);
                    return;
                }
                
            });
            if (intent == 'Seeker') {
                window.location.href = 'dashboard.html';
                localStorage.viewType = "AvailableJobs";
                return;
            }
            localStorage.viewType = "PostedJobs";
            window.location.href = 'postJob.html';
            return;
        }
        $scope.user.type = localStorage.intent;
        $('html, body').animate({
            scrollTop: $("#register").offset().top
        }, 2000);
    };

    $scope.loginUser = function () {
        $.skylo('start');
        $.skylo('inch', 5);
        userService.login($scope).then(function (response) {
            $.skylo('end');
            if (response.status != 200) {
                $scope.loginResponse = response.responseText;
                return;
            }
            $scope.user = response.candidateProfile;
            //alert(response.candidateProfile);
            postLogin($scope);
        });


    };

    $scope.logout = function () {
        userService.logout();
    };


});

function postLogin($scope) {
    if($scope.user.type == null) {
        $scope.user.type = localStorage.intent;
    }
    localStorage.user = JSON.stringify($scope.user);
    if ($scope.user.type == 'Poster') {
        window.location.href = 'postJob.html';
    } else if ($scope.user.type == 'Seeker' && $scope.user.description == null || $scope.user.description.length == 0) {
        window.location.href = 'updateProfile.html';
    } else {
        window.location.href = 'dashboard.html';
    }

}