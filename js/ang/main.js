var app = angular.module("app", []);

//var root = "http://localhost:8080/jobz-app/service";
var root = "http://115.124.124.220:8080/jobz/service";



app.service('generic', function ($http) {
    this.getSkills = function (skillName, $scope) {
        //alert("In service");
        var dataObj = {
            jobSkillRequested: skillName
        };
        var res = $http.post(root + '/searchSkill', dataObj);
        res.success(function (data, status, headers, config) {
            //alert(data.matchingJobSkills);
            $scope.matchingSkills = data.matchingJobSkills;
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({
                data: data
            }));
            
        });
    }
    
    this.getEducations = function (education, $scope) {
        //alert("In service");
        var dataObj = {
            educationRequested: education
        };
        var res = $http.post(root + '/searchEducation', dataObj);
        res.success(function (data, status, headers, config) {
            //alert(data.matchingJobSkills);
            $scope.matchingEducations = data.matchingEducations;
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({
                data: data
            }));
        });
    }
});

app.service('userService', function ($http, $q) {

    var deferred;
    var response = {};
    
    this.register = function ($scope) {
        //alert("In service");
        var dataObj = {
            requestedBy: {
                name: $scope.user.name,
                email: $scope.user.email,
                password: $scope.user.password,
                phone: $scope.user.phone,
                type: $scope.user.type
            }
        };
        deferred = $q.defer();
        var res = $http.post(root + '/registerUser', dataObj);
        res.success(function (data, status, headers, config) {
            response = data;
            deferred.resolve(response);
        });
        res.error(function (data, status, headers, config) {
            /*alert("failure message: " + JSON.stringify({
                data: data
            }));*/
            response = data;
            deferred.resolve(response);
        });
        
        response = deferred.promise;
        return $q.when(response);
    }
    
    this.logout = function() {
        localStorage.loggedIn = null;
        localStorage.user = null;
        localStorage.currentJob = null;
        localStorage.postJob = null;
        localStorage.profile = null;
        localStorage.viewProfile = null;
        localStorage.viewType = null;
        localStorage.intent = null;
        window.location.href = "index.html";
    }
    
    this.login = function ($scope) {
        //alert("In service " + $scope);
        var dataObj = {
            requestedBy: {
                email: $scope.user.email,
                password: $scope.user.password
            }
        };
        //alert($scope.user);
        deferred = $q.defer();
        var res = $http.post(root + '/loginUser', dataObj);
        res.success(function (data, status, headers, config) {
            //alert("Done:" + data);
            response = data;
            deferred.resolve(response);
        });
        res.error(function (data, status, headers, config) {
            /*alert("failure message: " + JSON.stringify({
                data: data
            }));*/
            response = data;
            deferred.resolve(response);
        });
        response = deferred.promise;
        return $q.when(response);
    }

    this.getUser = function ($scope) {
        //alert("In service");
        var dataObj = {
            requestedBy: {
                name: $scope.user.name,
                email: $scope.user.email,
                password: $scope.user.password,
                phone: $scope.user.phone
            }
        };
        deferred = $q.defer();
        var res = $http.post(root + '/getUser', dataObj);
        res.success(function (data, status, headers, config) {
            response = data;
            //alert("1:" + data.candidateProfile.postedJobs);
            deferred.resolve(response);
            //alert("Data:" + response.candidateProfile.profileInterests.length);

        });
        res.error(function (data, status, headers, config) {
            /*alert("failure message: " + JSON.stringify({
                data: data
            }));*/
            response = data;
            deferred.resolve(response);
        });
        response = deferred.promise;
        return $q.when(response);
    }
    
    this.update = function ($scope) {
        //alert("In service" + $scope.user.sector);
        var dataObj = {
            requestedBy: {
                name: $scope.user.name,
                email: $scope.user.email,
                password: $scope.user.password,
                phone: $scope.user.phone,
                company: $scope.user.company,
                designation: $scope.user.designation,
                experience: $scope.user.experience,
                description: $scope.user.description,
                jobSkills : $scope.user.jobSkills,
                educations : $scope.user.educations,
                type: $scope.user.type,
                sector: {
                    id: $scope.user.sector.id
                }
            }
        };
        //alert(JSON.stringify(dataObj));
        deferred = $q.defer();
        var res = $http.post(root + '/updateUser', dataObj);
        res.success(function (data, status, headers, config) {
            response = data;
            deferred.resolve(response);
        });
        res.error(function (data, status, headers, config) {
            /*alert("failure message: " + JSON.stringify({
                data: data
            }));*/
            response = data;
            deferred.resolve(response);
        });
        
        response = deferred.promise;
        return $q.when(response);
    }

});



app.service('jobService', function ($http, $q) {
    
    var deferred;
    var response = {};
    
    this.postJob = function ($scope) {
        //alert("In service  " + localStorage.user);
        user = JSON.parse(localStorage.user);
        //alert(user);
        var date = new Date();
        //alert($scope.job.expiryDate);
        var expiryDate = new Date($scope.job.expiryDate);
        //alert(expiryDate);
        var dataObj = {

            postJobRequested: {
                postedDate: date,
                expiryDate: expiryDate,
                location: $scope.job.location,
                type: $scope.job.type,
                minExperience: $scope.job.minExperience,
                maxExperience: $scope.job.maxExperience,
                salary: $scope.job.salary,
                description: $scope.job.description,
                maxApplicants: 15,
                jobTitle: $scope.job.jobTitle,
                companyName: $scope.job.companyName,
                postedBy: {
                    name: user.name,
                    designation: "",
                    company: "",
                    email: user.email,
                    password: user.password
                },
                skillsRequired: $scope.job.skillsRequired,
                sector: {
                    id: $scope.job.sector.id
                }
            }
        }
        //alert("calling");
        deferred = $q.defer();
        var res = $http.post(root + '/postJob', dataObj);
        res.success(function (data, status, headers, config) {
            response = data;
            deferred.resolve(response);
        });
        res.error(function (data, status, headers, config) {
            /*alert("failure message: " + JSON.stringify({
                data: data
            }));*/
            response = data;
            deferred.resolve(response);
        });
        response = deferred.promise;
        return $q.when(response);
    }
    
    this.updateJob = function ($scope) {
        //alert("In service  " + localStorage.user);
        user = JSON.parse(localStorage.user);
        //alert(user);
        var date = new Date();
        //alert($scope.job.expiryDate);
        var expiryDate = new Date($scope.job.expiryDate);
        //alert(expiryDate);
        var dataObj = {

            postJobRequested: {
                id: $scope.job.id,
                expiryDate: expiryDate,
                location: $scope.job.location,
                type: $scope.job.type,
                minExperience: $scope.job.minExperience,
                maxExperience: $scope.job.maxExperience,
                salary: $scope.job.salary,
                description: $scope.job.description,
                maxApplicants: 15,
                jobTitle: $scope.job.jobTitle,
                companyName: $scope.job.companyName,
                skillsRequired: $scope.job.skillsRequired,
                sector: {
                    id: $scope.job.sector.id
                }
            }
        }
        //alert("calling");
        deferred = $q.defer();
        var res = $http.post(root + '/updateJob', dataObj);
        res.success(function (data, status, headers, config) {
            response = data;
            deferred.resolve(response);
        });
        res.error(function (data, status, headers, config) {
            /*alert("failure message: " + JSON.stringify({
                data: data
            }));*/
            response = data;
            deferred.resolve(response);
        });
        response = deferred.promise;
        return $q.when(response);
    }
    
    this.showInterest = function ($scope) {
        
        //user = JSON.parse(localStorage.user);
        //alert($scope.interestedProfile.email);
        var dataObj = {

            applyJobRequested: {
                id: $scope.interestedJob.id,
                currentCandidate: {
                    name: $scope.interestedProfile.name,
                    email: $scope.interestedProfile.email
                },
                interestShownByPoster: $scope.interestByPoster,
                interestShownBySeeker: $scope.interestBySeeker
            }
        }
        //alert("calling" + JSON.stringify(dataObj));
        deferred = $q.defer();
        var res = $http.post(root + '/applyForJob', dataObj);
        res.success(function (data, status, headers, config) {
            response = data;
            deferred.resolve(response);
        });
        res.error(function (data, status, headers, config) {
            /*alert("failure message: " + JSON.stringify({
                data: data
            }));*/
            response = data;
            deferred.resolve(response);
        });
        response = deferred.promise;
        return $q.when(response);
    }
    
    this.deleteJob = function ($scope) {
        
        var dataObj = {
            postJobRequested: {
                id: $scope.jobToDelete.id
            }
        }
        //alert("calling" + JSON.stringify(dataObj));
        deferred = $q.defer();
        var res = $http.post(root + '/deleteJob', dataObj);
        res.success(function (data, status, headers, config) {
            response = data;
            deferred.resolve(response);
        });
        res.error(function (data, status, headers, config) {
            response = data;
            deferred.resolve(response);
        });
        response = deferred.promise;
        return $q.when(response);
    }
});


/*app.directive('datepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            $(function () {
                element.datepicker({
                    dateFormat: 'dd/mm/yy',
                    onSelect: function (date) {
                        alert(date);
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(date);
                        });
                    }
                });
            });
        }
    }
});*/