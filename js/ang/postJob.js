angular.module("app").controller('postJob', function ($scope, generic, $http) {

    $scope.skills = [];
    $scope.educations = [];

    if (localStorage.profile != null) {
        $scope.user = JSON.parse(localStorage.profile);
        //alert($scope.user.jobSkills);
    }

    $scope.itemClick = function ($skill) {
        //alert("Item clicked!" + $skill.name);
        $scope.user.skills.push($skill);
        $scope.job.skills.push($skill);
        $scope.skill = "";
        $("#skillInput").val("");
        $scope.matchingSkills = [];
        //alert($scope.skills);
    };

    $scope.onKeyUp = function ($event) {
        //alert("Here!" + $event.keyCode);
        if ($event.keyCode == 13) {
            $scope.user.jobSkills.push($scope.skill);
            $scope.job.skills.push($scope.skill);
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
        $scope.user.jobSkills.pop($skill);
        $scope.job.skills.pop($skill);
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
        window.location.href = "viewJob.html";
    };

    $scope.saveProfile = function () {
        //$scope.user.skills = $scope.skills;
        //$scope.user.educations = $scope.educations;
        //$scope.user.intent = localStorage.intent;
        localStorage.viewProfile = JSON.stringify($scope.user);
        window.location.href = "viewProfile.html";
    };



});