angular.module("app").controller('register', function ($scope, userService) {

    $scope.loggedIn = null;
    if (localStorage.user != null) {
        $scope.loggedIn = JSON.parse(localStorage.user);
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


    $scope.registerUser = function () {
        $scope.showProgress = true;
        $.skylo('start');
        $.skylo('inch', 5);
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


    $scope.selectIntent = function (intent) {
        localStorage.intent = intent;
        if ($scope.loggedIn != null) {
            if (intent == 'Seeker') {
                window.location.href = 'dashboard.html';
                localStorage.viewType = "AvailableJobs";
                return;
            }
            localStorage.viewType = "PostedJobs";
            window.location.href = 'postJob.html';
            return;
        }
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

    $scope.goToRegister = function (intent) {


    };
    
    $scope.logout = function () {
        userService.logout();
    };


});

function postLogin($scope) {
    localStorage.user = JSON.stringify($scope.user);
    if (localStorage.intent == 'Referrer' || localStorage.intent == 'Recruiter') {
        window.location.href = 'postJob.html';
    } else if (localStorage.intent == 'Seeker' && $scope.user.description == null || $scope.user.description.length == 0) {
        window.location.href = 'updateProfile.html';
    } else {
        window.location.href = 'dashboard.html';
    }

}

