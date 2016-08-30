angular.module("app").controller('dashboard', function ($scope, userService, jobService, $http) {

    $scope.loggedIn = JSON.parse(localStorage.user);
    if ($scope.loggedIn == null) {
        window.location.href = "index.html";
        return;
    }

    $scope.user = JSON.parse(localStorage.user);
    if(localStorage.viewType == null) {
        viewType = "PostedJobs";
    }
    

    //alert($scope.user);
    if ($scope.user != null) {
        userService.getUser($scope).then(function (response) {
            if (response.status == 200) {
                $scope.profile = response.candidateProfile;
                //alert(response.candidateProfile.profileInterests);
                localStorage.profile = JSON.stringify($scope.profile);
                //alert($scope.profile.profileInterests.length);
                $scope.postedJobs = response.candidateProfile.postedJobs;
                $scope.header = "Posted Jobs";
                if (localStorage.viewType == "MatchingProfiles") {
                    var job = JSON.parse(localStorage.currentJob);
                    var i = 0;
                    //alert("Here!" + job.id);
                    for (i = 0; i < response.candidateProfile.postedJobs.length; i++) {
                        //alert(response.candidateProfile.postedJobs[i].id);
                        if (response.candidateProfile.postedJobs[i].id == job.id) {
                            $scope.showMatchingProfiles(response.candidateProfile.postedJobs[i]);
                            break;
                        }
                    }
                } else if(localStorage.viewType == "MyCandidates") {
                    $scope.showPosterInterests("close");
                } else if(localStorage.viewType == "InterestShown") {
                    $scope.showInterestCandidates(job);
                } else if(localStorage.viewType == "AvailableJobs") {
                    $scope.showAvailableJobs("close");
                }
            }

        });
    }

    $scope.postJob = function () {
        //TODO :
    };

    $scope.logout = function () {

        localStorage.loggedIn = null;
        localStorage.user = null;
        window.location.href = "index.html";
    };

    $scope.showMatchingProfiles = function (job) {
        $scope.candidates = job.matchingCandidates;
        localStorage.currentJob = JSON.stringify(job);
        $scope.jobsList = [];
        $scope.myCandidates = [];
        $scope.postedJobs = [];
        $scope.header = "Matching Candidates for " + job.jobTitle;
        localStorage.viewType = "MatchingProfiles";
    };

    $scope.showPostedJobs = function (drawerState) {
        localStorage.currentJob = null;
        var profile = JSON.parse(localStorage.profile);
        $scope.myCandidates = [];
        $scope.candidates = [];
        $scope.postedJobs = profile.postedJobs;
        $scope.header = "Posted Jobs";
        localStorage.viewType = "PostedJobs";
        if(drawerState == "open") {
            $("#drawer-toggle").click();
        }
       
    };
    
    $scope.showPosterInterests = function (drawerState) {
        localStorage.currentJob = null;
        $scope.jobsList = [];
        $scope.candidates = [];
        $scope.postedJobs = [];
        var profile = JSON.parse(localStorage.profile);
        $scope.myCandidates = profile.profileInterests;
        $scope.header = "My Candidates";
        if(drawerState == "open") {
            $("#drawer-toggle").click();
        }
        localStorage.viewType = "MyCandidates";
    };

    $scope.showInterestCandidates = function(job) {
        $scope.myCandidates = job.interestCandidates;
        localStorage.currentJob = JSON.stringify(job);
        $scope.jobsList = [];
        $scope.postedJobs = [];
        $scope.candidates = [];
        $scope.header = "Interest shown for " + job.jobTitle;
        localStorage.viewType = "InterestShown";
    };
    
    
    $scope.showAvailableJobs = function (drawerState) {
        localStorage.currentJob = null;
        $scope.postedJobs = [];
        $scope.candidates = [];
        var profile = JSON.parse(localStorage.profile);
        $scope.jobsList = profile.availableJobs;
        $scope.header = "Jobs For you";
        if(drawerState == "open") {
            $("#drawer-toggle").click();
        }
        localStorage.viewType = "AvailableJobs";
    };
    
    $scope.showInterestCandidate = function (candidate) {
        $scope.interestedProfile = candidate;
        $("#showInterestModal").modal('show');
    };

    $scope.showInterest = function () {
        jobService.showInterest($scope).then(function (response) {
            if (response.status == 200) {
                //alert("Done!");
                $scope.showInterestResponse = "Interest submitted successfully!";
            } else {
                $scope.showInterestResponse = response.statusText;
            }
        });
    };


});