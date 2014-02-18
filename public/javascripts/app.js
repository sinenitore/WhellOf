var wof = angular.module('wof', ['ngRoute']).config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/ang/main',
    controller: 'BoardController'
  })
  $routeProvider.otherwise( { redirectTo: '/' });
});
wof.controller('MainController', function() {

});

wof.controller('BoardController', function($scope, $http, $location) {
  $http.get('api/puzzle').
    success(function(data, status, headers, config) {
      $scope.puzzle = data;
    });
});
