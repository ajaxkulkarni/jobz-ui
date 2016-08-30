angular.module("app").controller('register', function ($scope, userService) {

    $scope.loggedIn = {};
    if (localStorage.user != null) {
        $scope.loggedIn = JSON.parse(localStorage.user);
    }

    //alert("Here!");
    $scope.user = {};
    $scope.response = {};
    $scope.loginResponse = "";
    $scope.registerResponse = "";

    $scope.registerUser = function () {

        userService.register($scope).then(function (response) {
            if ($scope.response.status != 200) {
                $scope.registerResponse = $scope.response.responseText;
                return;
            }
            postLogin($scope);
        });

    };


    $scope.selectIntent = function (intent) {
        localStorage.intent = intent;
       
        if ($scope.loggedIn != null) {
            window.location.href = 'postJob.html';
            return;
        }
         $('html, body').animate({
            scrollTop: $("#register").offset().top
        }, 2000);
    };

    $scope.loginUser = function () {
        userService.login($scope).then(function (response) {
            if (response.status != 200) {
                $scope.loginResponse = response.responseText;
                //alert($scope.loginResponse);
                return;
            }
            postLogin($scope);
        });


    };

    $scope.goToRegister = function (intent) {
        

    };


});

function postLogin($scope) {
    localStorage.user = JSON.stringify($scope.user);
    if (localStorage.intent == 'Referrer' || localStorage.intent == 'Recruiter') {
        window.location.href = 'postJob.html';
    } else if (localStorage.intent == 'Seeker') {
        window.location.href = 'updateProfile.html';
    } else {
        window.location.href = 'dashboard.html';
    }

}