'use strict';
//module
var app = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//routes
app.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })
    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
});

//services
app.service('cityService', function(){
  this.city = "New York, NY";
});

//controllers
app.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
  $scope.city = cityService.city;
  $scope.$watch('city', function(){
    cityService.city = $scope.city;
  });
}]);

app.controller('forecastController', ['$scope', 'cityService', function($scope, cityService){
  $scope.city = cityService.city;
}]);
