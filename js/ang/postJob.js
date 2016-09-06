angular.module("app").controller('postJob', function ($scope, generic, $http) {

    if(localStorage.user == null) {
        window.location.href = "index.html";
        return;
    }
    
    $scope.loggedIn = JSON.parse(localStorage.user);
    
    if ($scope.loggedIn == null) {
        window.location.href = "index.html";
        return;
    }
    
    //alert("Hi!");
    $scope.skills = [];
    $scope.educations = [];
    $scope.job = {};
    $scope.job.skills = [];
    $scope.job.type = "Referrer";
    
    //alert(localStorage.profile);
    
    if (localStorage.profile != null) {
        $scope.user = JSON.parse(localStorage.profile);
        //alert($scope.user.jobSkills);
    }
    
    if(localStorage.postJob != null) {
        $scope.job = JSON.parse(localStorage.postJob);
        $scope.job.expiryDate = new Date($scope.job.expiryDate).toString('yyyy-MM-dd');
        //alert($scope.job.skillsRequired);
    }
    
    //alert($scope.user.experience);
    if($scope.user == null) {
        //alert($scope.user);
        $scope.user = {};
        $scope.user.jobSkills = [];
        $scope.user.educations = [];
    }

    $scope.itemClick = function ($skill) {
        //alert($scope.user);
        if ($scope.user != null) {
            //alert($scope.user.jobSkills);
            $scope.user.jobSkills.push($skill);
        }
        if ($scope.job != null) {
            $scope.job.skillsRequired.push($skill);
        }
        //alert($scope.job.skills);
        $scope.skill = "";
        $("#skillInput").val("");
        $scope.matchingSkills = [];
        //alert($scope.skills);
    };

    $scope.onKeyUp = function ($event) {
        //alert("Here!" + $event.keyCode);
        if ($event.keyCode == 13) {
            //alert($scope.user);
            if ($scope.user != null) {
                //alert($scope.user.jobSkills);
                $scope.user.jobSkills.push($scope.skill);
            }
            if ($scope.job != null) {
                $scope.job.skillsRequired.push($scope.skill);
            }
            $scope.skill = "";
            $("#skillInput").val("");
        } else {
            //alert("Calling..");
            if ($scope.skill && $scope.skill.name != null && $scope.skill.name.length > 0) {
                generic.getSkills($scope.skill.name, $scope);
            } else {
                $scope.matchingSkills = [];
            }

            //alert($scope.matchingSkills);
        }
    };

    $scope.removeSkill = function ($skill) {
        if ($scope.user != null) {
            $scope.user.jobSkills.pop($skill);
        }
        if ($scope.job != null) {
            $scope.job.skillsRequired.pop($skill);
        }
    };


    //For Education

    $scope.itemClickEdu = function ($edu) {
        //alert("Item clicked!" + $edu.name);
        $scope.user.educations.push($edu);
        $scope.education = {};
        $("#educationInput").val("");
        $scope.matchingEducations = [];
        //alert($scope.skills);
    };

    $scope.onKeyUpEdu = function ($event) {
        //alert("Here!" + $event.keyCode);
        if ($event.keyCode == 13) {
            $scope.user.educations.push($scope.education);
            $scope.education = {};
            $("#educationInput").val("");
        } else {
            //alert("Calling..");
            if ($scope.education != null && $scope.education.name != null && $scope.education.name.length > 0) {
                generic.getEducations($scope.education.name, $scope);
            } else {
                $scope.matchingEducations = [];
            }

            //alert($scope.matchingSkills);
        }
    };

    $scope.removeEdu = function ($edu) {
        var index = $scope.user.educations.indexOf($edu);
        $scope.user.educations.splice(index, 1);
        //$scope.user.educations.pop($edu);
    };


    $scope.saveJob = function () {
        //$scope.job.skills = $scope.skills;
        //$scope.job.intent = localStorage.intent;
        localStorage.postJob = JSON.stringify($scope.job);
        //alert($scope.job.intent);
        window.location.href = "viewJob.html";
    };

    $scope.saveProfile = function () {
        //$scope.user.skills = $scope.skills;
        //$scope.user.educations = $scope.educations;
        //$scope.user.intent = localStorage.intent;
        //alert($(".selecter_2"));
        localStorage.viewProfile = JSON.stringify($scope.user);
        window.location.href = "viewProfile.html";
    };



});