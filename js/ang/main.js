var app = angular.module("app", []);

var root = "http://localhost:8080/jobz-app/service";


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
                phone: $scope.user.phone
            }
        };
        deferred = $q.defer();
        var res = $http.post(root + '/registerUser', dataObj);
        res.success(function (data, status, headers, config) {
            response = data;
            deferred.resolve(response);
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({
                data: data
            }));
        });
        
        response = deferred.promise;
        return $q.when(response);
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
            alert("failure message: " + JSON.stringify({
                data: data
            }));
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
            deferred.resolve(response);
            //alert("Data:" + response.candidateProfile.profileInterests.length);

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({
                data: data
            }));
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
                type: $scope.job.intent,
                experience: $scope.job.experience,
                salary: $scope.job.salary,
                description: $scope.job.description,
                maxApplicants: 15,
                jobTitle: $scope.job.jobTitle,
                companyName: $scope.job.company,
                postedBy: {
                    name: user.name,
                    designation: "",
                    company: "",
                    email: user.email,
                    password: user.password
                },
                skillsRequired: $scope.job.skills
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
            alert("failure message: " + JSON.stringify({
                data: data
            }));
        });
        response = deferred.promise;
        return $q.when(response);
    }
    
    this.showInterest = function ($scope) {
        
        user = JSON.parse(localStorage.user);
        var job = JSON.parse(localStorage.currentJob);
        alert($scope.interestedProfile.email);
        var dataObj = {

            applyJobRequested: {
                id: job.id,
                currentCandidate: {
                    name: $scope.interestedProfile.name,
                    email: $scope.interestedProfile.email
                },
                interestShownByPoster: "Y"
            }
        }
        //alert("calling");
        deferred = $q.defer();
        var res = $http.post(root + '/applyForJob', dataObj);
        res.success(function (data, status, headers, config) {
            response = data;
            deferred.resolve(response);
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({
                data: data
            }));
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