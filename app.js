// 'use strict';
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
    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
});

//services
app.service('cityService', function(){
  this.city = "New York, NY";
});

//controllers
app.controller('homeController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService){
  $scope.city = cityService.city;
  $scope.$watch('city', function(){
    cityService.city = $scope.city;
  });
}]);

app.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService){
  $scope.city = cityService.city;
  $scope.days = $routeParams.days || "3";
  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?APPID=4b986559c555b001f506ff8198500618", {
    callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});

  $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days});
  $scope.convertToF = function(degK) {
    return Math.round((1.8*(degK-273))+32);
  }
  $scope.convertToC = function(degK) {
    return Math.round(degK-273.15);
  }
  $scope.convertToDate = function(dt) {
    return new Date(dt*1000);
  }
  console.log($scope.weatherResult);
}]);


//directive
app.directive("weatherReport", function(){
  return {
    restrict: 'E',
    templateUrl: 'directives/weatherReport.html',
    replace: true,
    scope: {
      weatherDay: "=",
      convertToCStd: "&",
      convertToFStd: "&",
      convertToDate: "&",
      dateFormat: "@"
    }
  }
});
