angular.module("app").controller('postJob', function ($scope, generic, $http) {
    $scope.skillName = "Java";
    $scope.skills = [];
    
    $scope.itemClick = function ($skill) {
        //alert("Item clicked!" + $skill.name);
        $scope.skills.push($skill);
        $scope.skill = "";
        $("#skillInput").val("");
        $scope.matchingSkills = [];
        //alert($scope.skills);
    };

    $scope.onKeyUp = function ($event) {
        //alert("Here!" + $event.keyCode);
        if ($event.keyCode == 13) {
            $scope.skills.push($scope.skill);
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
         $scope.skills.pop($skill);
    };
    
    $scope.saveJob = function () {
        $scope.job.skills = $scope.skills; 
        $scope.job.intent = localStorage.intent;
        localStorage.postJob = JSON.stringify($scope.job);
        window.location.href = "viewJob.html";
    };


});