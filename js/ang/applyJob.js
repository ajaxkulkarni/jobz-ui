angular.module("app").controller('applyJob', function ($scope, userService, jobService, $location) {


    //$scope.loggedIn = null;


    var jobId = $location.search().jobId;



    $.skylo({
        state: 'success',
        inchSpeed: 200,
        initialBurst: 30,
        flat: false
    });

    //alert($scope.user.type);

    $scope.getJob = function () {

        if (jobId == null) {
            $scope.jobResponse = "Job Application does not exist!";
            return;
        }

        $scope.showProgress = true;
        $.skylo('start');
        $.skylo('inch', 5);

        $scope.jobId = jobId;
        if(localStorage.user != null && localStorage.user != 'null') {
            $scope.loggedIn = JSON.parse(localStorage.user);
            $scope.email = $scope.loggedIn.email;
        }
        userService.getJob($scope).then(function (response) {
            $.skylo('end');
            $scope.showProgress = false;
            if (response == null) {
                $scope.jobResponse = "Error connecting server ..";
            }
            if (response.status != 200) {
                $scope.jobResponse = response.responseText;
                return;
            }
            $scope.job = response.jobRequested;
            $scope.getUser();
        });

    };

    $scope.getUser = function () {
        //alert(localStorage.user);
        if (localStorage.user != null && localStorage.user != 'null') {
            $scope.loggedIn = JSON.parse(localStorage.user);
            $scope.user = $scope.loggedIn;
            $scope.profile = $scope.user;
            $scope.showProgress = true;
            $.skylo('start');
            $.skylo('inch', 15);
            userService.getUser($scope).then(function (response) {
                $.skylo('end');
                $scope.loading = false;
                if (response != null && response.status == 200) {
                    $scope.profile = response.candidateProfile;
                    localStorage.user = JSON.stringify($scope.profile);
                    //alert(JSON.stringify(response));
                    //alert($scope.profile.appliedJobs);
                    if($scope.profile.appliedJobs == null) {
                        return;
                    }
                    var i = 0;
                    for(i = 0; i<$scope.profile.appliedJobs.length;i++) {
                        if($scope.job.id == $scope.profile.appliedJobs[i].id) {
                            $scope.applied = true;
                            break;
                        }
                    }
                }

            });

        }

    };

    if (jobId == null) {
        $scope.job = JSON.parse(localStorage.applyJob);
        if ($scope.job != null) {
            jobId = $scope.job.id;
        }
    }

    $scope.getJob();
   
    

    $scope.apply = function () {
        localStorage.applyJob = JSON.stringify($scope.job);
        if (localStorage.user != null && localStorage.user != 'null') {
            $scope.loggedIn = JSON.parse(localStorage.user);
            $scope.user = $scope.loggedIn;
            $scope.profile = $scope.user;
            //alert($scope.profile);
            $("#applyJobModal").modal('show');
            
        } else {
            window.location.href = "login.html";
        }
    }


    $scope.applyForJob = function () {
        $scope.interestedJob = $scope.job;
        $scope.interestedProfile = $scope.user;
        if (!$scope.attachCv) {
            $scope.applyJob();
            return;
        }
        if ($scope.profile.filePath != null && $scope.profile.filePath.length > 0) {
            $scope.applyJob();
        } else {
            $("#uploadModal").modal('show');
        }


    }

    $scope.viewContact = function (candidate) {
        $scope.acceptedCandidate = candidate;
        $("#acceptedCandidateModal").modal('show');
    };

    $scope.applyJob = function () {
        $scope.showApplyProgress = true;
        $scope.interestedProfile = $scope.user;
        $scope.interestBySeeker = "Y";
        $.skylo('start');
        $.skylo('inch', 5);
        //alert($scope.interestedProfile.designation);
        jobService.showInterest($scope).then(function (response) {
            $.skylo('end');
            if (response.status == 200) {
                //alert("Done!");
                if ($scope.interestedJob.interestShownByPoster == "Y") {
                    $("#applyJobModal").modal('hide');
                    $scope.viewContact($scope.interestedJob.postedBy);
                    localStorage.viewType = "AcceptedJobs";
                } else {
                    $scope.applyJobResponse = "Application submitted successfully! You will get the full contact details for this job only when the job poster also shows interest in your profile. Now you can find this job listed under 'Applications Sent'. Go to Dashboard to browse through other jobs.";
                }
                $scope.getUser();
            } else {
                $scope.applyJobResponse = response.statusText;
            }
        });
    };

    $scope.uploadFile = function () {

        var file = $scope.myFile;

        console.log('file is ');
        console.dir(file);
        if (file == null) {
            $scope.uploadError = "Please select a file";
            return;
        }
        if (file.size > 3000000) {
            alert(file.size);
            $scope.uploadError = "File size is too large. Can't upload more than 3 MBs.";
            return;
        }
        $.skylo('start');
        $.skylo('inch', 5);
        userService.uploadCV($scope).then(function (response) {
            $.skylo('end');
            if (response.status == 200) {
                $scope.uploadResponse = "Resume uploaded successfully!";
                //loadProfile();
            } else {
                $scope.uploadResponse = response.statusText;
            }
            $scope.profile.filePath = "filePath";
            localStorage.user = JSON.stringify($scope.profile);
            //alert($scope.attachCv);
            if ($scope.attachCv) {
                $("#uploadModal").modal('hide');
                $scope.applyJob();
            }
        });
    };



});