angular.module("app").controller('admin', function ($scope, adminService) {

    //alert("Here!");
    $scope.response = {};
    
    
    $scope.loggedIn = null;
    /*if (localStorage.user != null && localStorage.user != 'null') {
        $scope.loggedIn = JSON.parse(localStorage.user);
        $scope.user = $scope.loggedIn;
    } 
    if($scope.user == null) {
        $scope.user = {};
        //alert($scope.user);
    }*/
   

    $.skylo({
        state: 'success',
        inchSpeed: 200,
        initialBurst: 30,
        flat: false
    });

    //
    
    //alert("Here!");

    $scope.getPostedJobs = function () {
        $.skylo('start');
        $.skylo('inch', 5);
        
        adminService.getAllPostedJobs().then(function (response) {
            $.skylo('end');
            if (response == null) {
                $scope.adminResponse = "Error connecting server ..";
            }
            
            if (response.status == 200) {
                $scope.heading = "Posted Jobs"
                $scope.showPending = false;
                $scope.showAccepted = false;
                $scope.showPosted = true;
                $scope.response.postedJobs = response.adminResponse.postedJobs;
                //alert($scope.response);
                return;
            }
        });

    };
    
    $scope.getPendingJobs = function () {
        $.skylo('start');
        $.skylo('inch', 5);
        
        adminService.getAllPendingJobs().then(function (response) {
            $.skylo('end');
            if (response == null) {
                $scope.adminResponse = "Error connecting server ..";
            }
            
            if (response.status == 200) {
                $scope.heading = "Peding Jobs"
                $scope.showPending = true;
                $scope.showAccepted = false;
                $scope.showPosted = false;
                $scope.response.pendingJobs = response.adminResponse.postedJobs;
                //alert($scope.response);
                return;
            }
        });

    };
    
    $scope.getAcceptedJobs = function () {
        $.skylo('start');
        $.skylo('inch', 5);
        
        adminService.getAllAcceptedJobs().then(function (response) {
            $.skylo('end');
            if (response == null) {
                $scope.adminResponse = "Error connecting server ..";
            }
            
            if (response.status == 200) {
                $scope.heading = "Accepted Jobs"
                $scope.showPending = false;
                $scope.showAccepted = true;
                $scope.showPosted = false;
                $scope.response.acceptedJobs = response.adminResponse.postedJobs;
                //alert($scope.response.pendingJobs);
                return;
            }
        });

    };

    $scope.getPostedJobs();

   


});


