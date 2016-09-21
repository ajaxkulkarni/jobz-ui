angular.module("app").controller('register', function ($scope, userService) {

    $scope.response = {};
    /*$scope.loginResponse = null;
    $scope.registerResponse = null;
    $scope.showProgress = false;*/
    
    
    $scope.loggedIn = null;
    if (localStorage.user != null && localStorage.user != 'null') {
        $scope.loggedIn = JSON.parse(localStorage.user);
        $scope.user = $scope.loggedIn;
    } 
    if($scope.user == null) {
        $scope.user = {};
        //alert($scope.user);
    }
   

    $.skylo({
        state: 'success',
        inchSpeed: 200,
        initialBurst: 30,
        flat: false
    });


    $scope.registerUser = function (formValid) {
        if (!formValid) {
            $scope.registerShowErrors = true;
            return;
        }

        if ($scope.user.password != $scope.user.confirmPassword) {
            $scope.registerShowErrors = true;
            $scope.registerForm.cpassword.$invalid = true;
            return;
        }

        $scope.showProgress = true;
        $.skylo('start');
        $.skylo('inch', 5);
        if ($scope.user.type == null) {
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
                //alert("Seeker!");
                return;
            } else if (intent == 'Poster') {
                localStorage.viewType = "PostedJobs";
                window.location.href = 'postJob.html';
                //alert("Poster!");
                return;
            }
            //alert("Here!");
            window.location.href = 'dashboard.html';
            localStorage.viewType = "AvailableJobs";
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
            //alert(response.status);
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
    
    $scope.goToRegister = function() {
        $("#myModal").modal('hide');
        $('html, body').animate({
            scrollTop: $("#register").offset().top
        }, 2000);
        
    }
    
    $scope.goToHow = function() {
        $('html, body').animate({
            scrollTop: $("#how").offset().top
        }, 2000);
        
    }
    
    $scope.goToContact = function() {
        $('html, body').animate({
            scrollTop: $("#contact").offset().top
        }, 2000);
        
    }


});

function postLogin($scope) {
    if ($scope.user.type == null) {
        $scope.user.type = localStorage.intent;
    }
    localStorage.user = JSON.stringify($scope.user);
    if ($scope.user.type == 'Poster' && localStorage.intent == 'Poster') {
        window.location.href = 'postJob.html';
    } else if ($scope.user.type == 'Seeker' && ($scope.user.description == null || $scope.user.description.length == 0)) {
        window.location.href = 'updateProfile.html';
    } else {
        window.location.href = 'dashboard.html';
    }

}

