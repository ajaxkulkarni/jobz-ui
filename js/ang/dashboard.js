angular.module("app").controller('dashboard', function ($scope, userService, jobService, $http) {

    if(localStorage.user == null) {
        window.location.href = "index.html";
        return;
    }
    
    $scope.loggedIn = JSON.parse(localStorage.user);
    if ($scope.loggedIn == null) {
        window.location.href = "index.html";
        return;
    }

    $scope.user = JSON.parse(localStorage.user);

    //alert(localStorage.viewType);

    //$scope.showProfileProgress = true;
    /*alert(localStorage.viewType);
    if (localStorage.viewType == null) {
        
        if (localStorage.intent == "Seeker") {
            viewType = "AvailableJobs";
        } else {
            viewType = "PostedJobs";
        }

    }
    */
    $.skylo({
        state: 'success',
        inchSpeed: 200,
        initialBurst: 30,
        flat: false
    });

    loadProfile();
    
    
    /*function hideProgressBars() {
        $scope.showProfileProgress = false;
        $scope.showApplyProgress = false;
    }*/

    function loadProfile() {
        //alert($scope.user);
        $.skylo('start');
        $.skylo('inch', 5);
        $scope.loading = true;
       
        if ($scope.user != null) {
            userService.getUser($scope).then(function (response) {
                $.skylo('end');
                $scope.loading = false;
                if (response != null && response.status == 200) {
                    $scope.profile = response.candidateProfile;
                    //alert(response.candidateProfile.profileInterests);
                    localStorage.profile = JSON.stringify($scope.profile);
                    //alert($scope.profile.profileInterests.length);
                    //alert("2:" + response.candidateProfile.postedJobs);
                    //$scope.header = "Posted Jobs";
                    var job = JSON.parse(localStorage.currentJob);
                    if (localStorage.viewType == "MatchingProfiles") {
                        
                        var i = 0;
                        //alert("Here!" + job.id);
                        for (i = 0; i < response.candidateProfile.postedJobs.length; i++) {
                            //alert(response.candidateProfile.postedJobs[i].id);
                            if (response.candidateProfile.postedJobs[i].id == job.id) {
                                $scope.showMatchingProfiles(response.candidateProfile.postedJobs[i]);
                                break;
                            }
                        }
                    } else if (localStorage.viewType == "MyCandidates") {
                        $scope.showPosterInterests("close");
                    } else if (localStorage.viewType == "InterestShown") {
                        $scope.showInterestCandidates(job);
                    } else if (localStorage.viewType == "AvailableJobs") {
                        $scope.showAvailableJobs("close");
                    } else if (localStorage.viewType == "PostedJobs") {
                        $scope.showPostedJobs("close");
                    } else if (localStorage.viewType == "AppliedJobs") {
                        $scope.showAppliedJobs("close");
                    } else if (localStorage.viewType == "AppliedCandidates") {
                        $scope.showAppliedCandidates(job);
                    } else if (localStorage.viewType == "AcceptedCandidates") {
                        $scope.showAcceptedCandidates("close");
                    } else if (localStorage.viewType == "AcceptedJobs") {
                        $scope.showAcceptedJobs();
                    } else if (localStorage.viewType == "JobRequests") {
                        $scope.showJobRequests();
                    }
                } else {
                    $scope.profileError = "Error loading your profile..";
                }

            });
        }
    }


    $scope.postJob = function () {
        //TODO :
    };

    $scope.logout = function () {
        userService.logout();
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
        if (drawerState == "open") {
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
        if (drawerState == "open") {
            $("#drawer-toggle").click();
        }
        localStorage.viewType = "MyCandidates";
    };

    $scope.showInterestCandidates = function (job) {
        $scope.myCandidates = job.interestCandidates;
        localStorage.currentJob = JSON.stringify(job);
        $scope.jobsList = [];
        $scope.postedJobs = [];
        $scope.candidates = [];
        $scope.header = "My Candidates for " + job.jobTitle;
        localStorage.viewType = "InterestShown";
    };
    
    $scope.showAppliedCandidates = function (job) {
        $scope.myCandidates = job.applications;
        localStorage.currentJob = JSON.stringify(job);
        $scope.jobsList = [];
        $scope.postedJobs = [];
        $scope.candidates = [];
        $scope.header = "Candidates Applied for " + job.jobTitle;
        localStorage.viewType = "AppliedCandidates";
    };
    
    $scope.showAcceptedCandidates = function (drawerState) {
        //alert("Here!");
        $scope.myCandidates = $scope.profile.acceptedProfiles;
        //localStorage.currentJob = JSON.stringify(job);
        $scope.jobsList = [];
        $scope.postedJobs = [];
        $scope.candidates = [];
        $scope.header = "Candidate contacts available to you";
        if (drawerState == "open") {
            $("#drawer-toggle").click();
        }
        localStorage.viewType = "AcceptedCandidates";
    };


    $scope.showAvailableJobs = function (drawerState) {
        localStorage.currentJob = null;
        $scope.postedJobs = [];
        $scope.candidates = [];
        $scope.myCandidates = [];
        var profile = JSON.parse(localStorage.profile);
        $scope.jobsList = profile.availableJobs;
        $scope.header = "Jobs For you";
        if (drawerState == "open") {
            $("#drawer-toggle").click();
        }
        localStorage.viewType = "AvailableJobs";
    };
            
    $scope.showAppliedJobs = function (drawerState) {
        localStorage.currentJob = null;
        $scope.postedJobs = [];
        $scope.candidates = [];
        $scope.myCandidates = [];
        var profile = JSON.parse(localStorage.profile);
        $scope.jobsList = profile.appliedJobs;
        $scope.header = "Applied By you";
        if (drawerState == "open") {
            $("#drawer-toggle").click();
        }
        localStorage.viewType = "AppliedJobs";
    };
    
    $scope.showAcceptedJobs = function () {
        localStorage.currentJob = null;
        $scope.postedJobs = [];
        $scope.candidates = [];
        $scope.myCandidates = [];
        var profile = JSON.parse(localStorage.profile);
        $scope.jobsList = profile.acceptedJobs;
        $scope.header = "Job Contacts for You";
        localStorage.viewType = "AcceptedJobs";
    };
    
    $scope.showJobRequests = function () {
        localStorage.currentJob = null;
        $scope.postedJobs = [];
        $scope.candidates = [];
        $scope.myCandidates = [];
        var profile = JSON.parse(localStorage.profile);
        $scope.jobsList = profile.jobRequests;
        $scope.header = "Job Requests for You";
        localStorage.viewType = "JobRequests";
    };

    $scope.showInterestCandidate = function (candidate) {
        $scope.interestedProfile = candidate;
        $("#showInterestModal").modal('show');
    };

    $scope.showInterestJob = function (job) {
        $scope.interestedJob = job;
        $("#applyJobModal").modal('show');
    };
    
    $scope.acceptInterestCandidate = function (candidate) {
        $scope.interestedProfile = candidate;
        $scope.showInterest();
        //$("#showInterestModal").modal('show');
    };

    $scope.showInterest = function () {
        $scope.showApplyProgress = true;
        $scope.interestByPoster = "Y";
        $scope.interestedJob = JSON.parse(localStorage.currentJob);
        $.skylo('start');
        $.skylo('inch', 5);
        jobService.showInterest($scope).then(function (response) {
            $.skylo('end');
            $scope.showApplyProgress = false;
            if (response.status == 200) {
                //alert("Done!");
                loadProfile();
                $scope.showInterestResponse = "Interest submitted successfully!";
            } else {
                $scope.showInterestResponse = response.statusText;
            }
        });
    };

    $scope.applyJob = function () {
        $scope.showApplyProgress = true;
        $scope.interestedProfile = $scope.user;
        $scope.interestBySeeker = "Y";
        $.skylo('start');
        $.skylo('inch', 5);
        jobService.showInterest($scope).then(function (response) {
            $.skylo('end');
            if (response.status == 200) {
                //alert("Done!");
                $scope.applyJobResponse = "Application submitted successfully!";
                loadProfile();
            } else {
                $scope.applyJobResponse = response.statusText;
            }
        });
    };
    
    $scope.viewContact = function(candidate) {
        $scope.acceptedCandidate = candidate;
        $("#acceptedCandidateModal").modal('show');
    };
    
    $scope.wipe = function() {
        $scope.showInterestResponse = null;
        $scope.applyJobResponse= null;
    };


});