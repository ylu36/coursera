app.controller('homeController', ['$scope', '$location', '$resource', 'cityService', function($scope, $location, $resource, cityService){
  $scope.city = cityService.city;
  $scope.$watch('city', function(){
    cityService.city = $scope.city;
  });
  $scope.submit = function() {
    $location.path("/forecast");
  }
}]);

app.controller('forecastController', ['$scope', '$location', '$resource', '$routeParams', 'cityService', function($scope, $location, $resource, $routeParams, cityService){
  $scope.city = cityService.city;
  $scope.days = $routeParams.days || "3";
  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?APPID=4b986559c555b001f506ff8198500618", {
    callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});

  $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days}, function(){
    console.log($scope.weatherResult);
    $scope.convertToF = function(degK) {
      return Math.round((1.8*(degK-273))+32);
    }
    $scope.convertToC = function(degK) {
      return Math.round(degK-273.15);
    }
    $scope.convertToDate = function(dt) {
      return new Date(dt*1000);
    }
  }, function(err) {
    $location.path("/");
    alert("invalid city name!");
  });

}]);
