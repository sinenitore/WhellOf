var wof = angular.module('wof', ['ngRoute', 'ngAnimate']).config(function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/ang/main',
      controller: 'MainController'
    }).
    when('/puzzle', {
      templateUrl: '/ang/puzzle',
      controller: 'PuzzleController'
    }).
    otherwise({
      redirectTo: '/'
    });
});


wof.controller('MainController', function($scope, $location, PuzzleSvc) {
  $scope.puzzleTextSubmit = function(str) {
    console.log(str)
    PuzzleSvc.setPuzzleText(str)
    console.log($location.path())
    $location.path('/puzzle')
    console.log($location.path())
  }
});

wof.controller('PuzzleController', function($scope, $http, $location, PuzzleSvc) {
  var pText = PuzzleSvc.getPuzzleText()
  console.log(pText)
  $http.get('api/board/' + pText).
  success(function(data, status, headers, config) {
    $scope.puzzle = data.puzzle;
    $scope.pAnswer = data.pAnswer;
    $scope.consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']
    $scope.vowels = ['a', 'e', 'i', 'o', 'u']
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
            console.log($scope.puzzle[rowNumber][colNumber])
            $scope.puzzle[rowNumber][colNumber] = 1 
            console.log($scope.puzzle[rowNumber][colNumber])
          }
          console.log($scope.puzzle)
        } else {
          //hold
        }
      });
    };
});

wof.controller('BoardController', function($scope, $http, $location) {
  console.log($scope)
});

wof.factory('PuzzleSvc', function() {
  var pText = ''
  return {
    getPuzzleText: function() {
      return pText
    },
    setPuzzleText: function(str) {
      pText = str
    }
  }
});

