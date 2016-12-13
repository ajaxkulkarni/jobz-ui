angular.module("app").controller('activation', function ($scope, userService, $location) {

    
    $scope.loggedIn = null;
    if (localStorage.user != null && localStorage.user != 'null') {
        $scope.loggedIn = JSON.parse(localStorage.user);
        $scope.user = $scope.loggedIn;
    } 
    
    var code = $location.search().activationCode;
    var user = $location.search().activationUser;
    
    console.log(code + ":" + user);
   
    $.skylo({
        state: 'success',
        inchSpeed: 200,
        initialBurst: 30,
        flat: false
    });

    //alert($scope.user.type);
    
    $scope.activateUser = function () {
        
        $scope.showProgress = true;
        $.skylo('start');
        $.skylo('inch', 5);
       
        userService.activate($scope).then(function (response) {
            $.skylo('end');
            $scope.showProgress = false;
            if (response == null) {
                $scope.registerResponse = "Error connecting server ..";
            }
            if (response.status != 200) {
                $scope.registerResponse = response.responseText;
                return;
            }
            $scope.user = response.candidateProfile;
            $scope.user.status = "A";
            localStorage.user = JSON.stringify($scope.user);
            if($scope.user.type == "Poster") {
                window.location.href = 'postJob.html';
            } else {
                window.location.href = 'updateProfile.html';
            }
            
            
        });

    };
    
    if($scope.user == null) {
        $scope.user = {};
    }
    
    if(code != null && code.length > 0 && user != null && user.length > 0) {
        console.log("User :" + $scope.user);
        $scope.user.email = user;
        $scope.user.activationCode = code;
        $scope.activateUser();
    }

   
    $scope.logout = function() {
        userService.logout();
    }
    
    $scope.sendPassword = function () {
        
        $scope.showProgress = true;
        $.skylo('start');
        $.skylo('inch', 5);
        $scope.successResponse = "";
        userService.forgotPassword($scope).then(function (response) {
            $.skylo('end');
            $scope.showProgress = false;
            if (response == null) {
                $scope.registerResponse = "Error connecting server ..";
            }
            if (response.status != 200) {
                $scope.registerResponse = response.responseText;
                return;
            } else {
                $scope.successResponse = "Password sent to your email successfully!";
                return;
            }
            
        });

    };
    
    $scope.resend = function () {
        
        $scope.showProgress = true;
        $.skylo('start');
        $.skylo('inch', 5);
       
        userService.resend($scope).then(function (response) {
            $.skylo('end');
            $scope.showProgress = false;
            if (response == null) {
                $scope.registerResponse = "Error connecting server ..";
            }
            if (response.status != 200) {
                $scope.registerResponse = response.responseText;
                return;
            } else {
                $scope.successResponse = "Activation mail sent again!";
            }
            
        });

    };


});


