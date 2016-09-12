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
    $scope.job.skillsRequired = [];
    $scope.job.type = "Referrer";
    //$scope.job.sector.id = "IT";
    
    //alert(localStorage.profile);
    
    if (localStorage.profile != null) {
        $scope.user = JSON.parse(localStorage.profile);
        if($scope.user != null && $scope.user.sector.id != null) {
            $scope.user.sector.id = $scope.user.sector.id.toString();
        }
        //alert($scope.user.jobSkills);
    }
    //alert(localStorage.postJob!= 'null');
    if(localStorage.postJob != null && localStorage.postJob != 'null') {
        $scope.job = JSON.parse(localStorage.postJob);
        $scope.job.expiryDate = new Date($scope.job.expiryDate).toString('yyyy-MM-dd');
        if($scope.job.sector.id != null) {
            $scope.job.sector.id = $scope.job.sector.id.toString();
        }   
        //alert($scope.job.skillsRequired);
    }
    //$scope.job.sector.id = "2";
    //alert($scope.user.experience);
    if($scope.user == null) {
        //alert($scope.user);
        $scope.user = {};
        $scope.user.jobSkills = [];
        $scope.user.educations = [];
    }

    $scope.itemClick = function ($skill,$event) {
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
        $event.preventDefault();
        return false;
    };

    $scope.onKeyUp = function ($event) {
        //alert("Here!" + $event.keyCode);
        if ($event.keyCode == 13) {
            //alert($scope.user);
            $scope.matchingSkills = [];
            if ($scope.user != null) {
                //alert($scope.user.jobSkills);
                $scope.user.jobSkills.push($scope.skill);
            }
            if ($scope.job != null) {
                $scope.job.skillsRequired.push($scope.skill);
            }
            $scope.skill = "";
            //$("#skillInput").val("");
        } else {
            //alert("Calling..");
            if ($scope.skill && $scope.skill.name != null && $scope.skill.name.length > 0) {
                generic.getSkills($scope.skill.name, $scope);
            } else {
                $scope.matchingSkills = [];
            }

            //alert($scope.matchingSkills);
        }
        $event.preventDefault();
        return false;
    };

    $scope.removeSkill = function ($skill,$event) {
        
        if ($scope.user != null) {
            var index = $scope.user.jobSkills.indexOf($skill);
            $scope.user.jobSkills.splice(index, 1);
            //$scope.user.jobSkills.pop($skill);
        }
        if ($scope.job != null) {
            var index = $scope.job.skillsRequired.indexOf($skill);
            $scope.job.skillsRequired.splice(index, 1);
            //$scope.job.skillsRequired.pop($skill);
        }
        $event.preventDefault();
        return false;
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


    $scope.saveJob = function (formValid) {
        //alert(formValid);
        if(!formValid) {
            $scope.showPostJobError = true;
            return;
        }
        //alert(angular.isNumber($scope.job.minExperience) + ":" + angular.isNumber($scope.job.maxExperience));
        if(isNaN($scope.job.minExperience) || isNaN($scope.job.maxExperience)) {
           $scope.expError = "Please enter valid Min and Max Experience";
           //alert("Here!");
           return; 
        }
        
        if((parseInt($scope.job.minExperience) > parseInt($scope.job.maxExperience))) {
            $scope.expError = "Please enter valid Min and Max Experience";
            //alert("Here 2!");
            return;
        }
        if($scope.job.skillsRequired.length == 0) {
            $scope.skillsError = "Please enter atleast one skill required for this job";
            return;
        }
        //$scope.job.skills = $scope.skills;
        //$scope.job.intent = localStorage.intent;
        localStorage.postJob = JSON.stringify($scope.job);
        //alert($scope.job.intent);
        window.location.href = "viewJob.html";
    };

    $scope.saveProfile = function (formValid) {
        if(!formValid) {
            $scope.showProfileError = true;
            return;
        }
        //alert(angular.isNumber($scope.job.minExperience) + ":" + angular.isNumber($scope.job.maxExperience));
        if(isNaN($scope.user.experience) || parseInt($scope.user.experience) < 0) {
           $scope.expError = "Please enter valid Experience";
           //alert("Here!");
           return; 
        }
        
        if($scope.user.jobSkills.length == 0) {
            $scope.skillsError = "Please enter atleast one skill for your profile";
            return;
        }
        localStorage.viewProfile = JSON.stringify($scope.user);
        window.location.href = "viewProfile.html";
    };

    $scope.showHint = function (hint) {
        $("#" + hint).show();
    };
    
    $scope.hideHint = function (hint) {
        $("#" + hint).hide();
    };

});