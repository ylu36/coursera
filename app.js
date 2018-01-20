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
//controllers
app.controller('homeController', ['$scope', function(){
    
}]);

app.controller('forecastController', ['$scope', function(){
    
}]);