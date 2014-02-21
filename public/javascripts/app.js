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
  $scope.revealedFn = function(letter){
    if ($scope.guessed.indexOf(letter) > -1){
      return true
    }
  }

  $http.get('api/board').
    success(function(data, status, headers, config) {
      $scope.puzzle = data;
      $scope.alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    });
  $scope.makingGuess = function(guess) {
    console.log(guess)
    $http.get('api/guess/' + guess).
      success(function(data, status, headers, config) {
        if (data.match === true){
          for (i = 0; i < data.hits.length; i++) {
            rowNumber = data.hits[i][0]
            colNumber = data.hits[i][1]
//            curCoord = 
            console.log($scope.puzzle['row' + rowNumber][colNumber])
            $scope.puzzle['row' + rowNumber][colNumber] = guess
            console.log($scope.puzzle['row' + rowNumber][colNumber])
          }
          console.log($scope.puzzle)
        } else {
          //hold
        }
      });
    };
});
