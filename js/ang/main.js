var app = angular.module("app", []);

var host = "http://localhost:8080/jobz-app";
//var host = "http://115.124.124.220:8080/jobz";
var root = host + "/service";
var rootAdmin = host + "/adminService";




app.service('generic', function ($http) {
    this.getSkills = function (skillName, $scope) {
        //alert("In service");
        var dataObj = {
            jobSkillRequested: skillName
        };
        var genSkill = {
            id: -1,
            name: "Press Enter to add this skill to your list."
        };
        var res = $http.post(root + '/searchSkill', dataObj);
        res.success(function (data, status, headers, config) {
            //alert(data.matchingJobSkills);
            $scope.matchingSkills = data.matchingJobSkills;
            if ($scope.matchingSkills.length == 0) {
                $scope.matchingSkills = [genSkill];
            }
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

    this.activate = function ($scope) {
        //alert("In service");
        var dataObj = {
            requestedBy: {
                name: $scope.user.name,
                email: $scope.user.email,
                password: $scope.user.password,
                phone: $scope.user.phone,
                activationCode: $scope.user.activationCode
            }
        };
        deferred = $q.defer();
        var res = $http.post(root + '/activateUser', dataObj);
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
    
    this.resend = function ($scope) {
        var dataObj = {
            requestedBy: {
                email: $scope.user.email
            }
        };
        deferred = $q.defer();
        var res = $http.post(root + '/resendActivation', dataObj);
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

    this.logout = function () {
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
                jobSkills: $scope.user.jobSkills,
                educations: $scope.user.educations,
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

    this.forgotPassword = function ($scope) {
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
        var res = $http.post(root + '/forgotPassword', dataObj);
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

    this.validateUser = function ($scope) {
        if (localStorage.user == null) {
            window.location.href = "index.html";
            return;
        }

        $scope.loggedIn = JSON.parse(localStorage.user);
        //alert(localStorage.user);
        if ($scope.loggedIn == null) {
            window.location.href = "index.html";
            return;
        }

        $scope.user = JSON.parse(localStorage.user);
        //alert($scope.user);
        if ($scope.user.status == "I") {
            window.location.href = "activation.html";
            return;
        }
    }

    this.uploadCV = function ($scope) {
        //alert("Here!" + file);
        
        var fd = new FormData();
        fd.append('file',$scope.myFile);
        fd.append('email',$scope.profile.email);
        
        deferred = $q.defer();
        var res = $http.post(root + "/upload", fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        });
        res.success(function (data, status, headers, config) {
            //alert("DOne!");
            response = data;
            deferred.resolve(response);
        });
        res.error(function (data, status, headers, config) {
            response = data;
            alert("Error!" + status + ":" + data);
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
        //alert($scope.interestedJob);
        var dataObj = {

                applyJobRequested: {
                    id: $scope.interestedJob.id,
                    currentCandidate: {
                        name: $scope.interestedProfile.name,
                        email: $scope.interestedProfile.email
                    },
                    interestShownByPoster: $scope.interestByPoster,
                    interestShownBySeeker: $scope.interestBySeeker,
                    attachCv : $scope.attachCv
                }
            }
            //alert("Here2");
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

app.service('adminService', function ($http, $q) {

    var deferred;
    var response = {};

    this.getAllPostedJobs = function () {
        var dataObj = {};
        deferred = $q.defer();
        var res = $http.post(rootAdmin + '/adminGetAllPostedJobs', dataObj);
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

    this.getAllPendingJobs = function () {
        var dataObj = {};
        deferred = $q.defer();
        var res = $http.post(rootAdmin + '/adminGetAllPendingJobs', dataObj);
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

    this.getAllAcceptedJobs = function () {
        var dataObj = {};
        deferred = $q.defer();
        var res = $http.post(rootAdmin + '/adminGetAllAcceptedJobs', dataObj);
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

    this.getAllUsers = function () {
        var dataObj = {};
        deferred = $q.defer();
        var res = $http.post(rootAdmin + '/adminGetAllUsers', dataObj);
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
                    },
                    poc: {
                        email: $scope.job.poc.email,
                        phone: $scope.job.poc.phone
                       
                    }
                }
            }
        //alert(dataObj.postJobRequested.poc.email);
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
            response = data;
            deferred.resolve(response);
        });
        response = deferred.promise;
        return $q.when(response);
    }
    
    this.sendMail = function($scope) {
        var dataObj = {
                mailer: {
                    type: $scope.mailer.type,
                    message: $scope.mailer.message,
                    subject: $scope.mailer.subject
                }
            }
        deferred = $q.defer();
        var res = $http.post(rootAdmin + '/sendToAll', dataObj);
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

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

/*app.config(function($routeProvider, $locationProvider){
    $routeProvider.when('/validate', {
        controller: 'validator'
    });
    //$locationProvider.html5Mode(true);
});

app.controller('validator',function($scope) {
    alert("Here!");
});*/

/*app.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
});*/

/*app.run(function($rootScope, $location){
    $rootScope.$on('$locationChangeSuccess', function() {
        $rootScope.actualLocation = $location.path();
        alert("Here!" + $rootScope.actualLocation);
    });        

   $rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
       alert("watching!" + $rootScope.actualLocation + ":" + newLocation); 
       if($rootScope.actualLocation === newLocation) {
            alert('Why did you use history back?');
        }
    });
});*/

/*app.run(function($rootScope, $route, $location){
   //Bind the `$locationChangeSuccess` event on the rootScope, so that we dont need to 
   //bind in induvidual controllers.

   $rootScope.$on('$locationChangeSuccess', function() {
        $rootScope.actualLocation = $location.path();
    });        

   $rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
        if($rootScope.actualLocation === newLocation) {
            alert('Why did you use history back?');
        }
    });
});*/


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