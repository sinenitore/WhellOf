var wof = angular.module('wof', ['ngRoute', 'ngAnimate', 'ui.bootstrap']).config(function($routeProvider) {
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

wof.factory('PuzzleScore', function($rootScope, $http) {
  var scores = {'Red': 0,
                'Blue': 0,
                'Yellow': 0}

  function add(team, val) {
    scores[team] += val
  }

  return {
    add: add,
    scores: scores
  };
});

wof.factory('GameScore', function($rootScope, $http) {
  var scores = {Red: 0,
                Blue: 0,
                Yellow: 0}

  function add(team, val) {
    scores[team] += val
  }

  return {
    add: add,
    scores: scores
  };
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

wof.controller('PuzzleController', function($scope, $http, $location, PuzzleSvc, PuzzleScore, LettersSvc) {
  var pText = PuzzleSvc.getPuzzleText()
  console.log(pText)
  $http.get('api/board/' + pText).
    success(function(data, status, headers, config) {
      $scope.puzzle = data.puzzle;
      $scope.pAnswer = data.pAnswer;
      $scope.letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      $scope.spinValues = [-100, 100, 200, 300, 400, 500, 600, 700]
  });
  // Setup guess form variable
  $scope.formData = {}
  
  // bind scores
  console.log(PuzzleScore.scores)
  puzzleScores = PuzzleScore
  $scope.scores = PuzzleScore.scores
  letterStatus = LettersSvc
  $scope.lettersGuessed = letterStatus.lettersGuessed
  $scope.lettersWrong = letterStatus.lettersWrong

  // $scope.check_form_data = function(data) {
  //   var msgs = []
  //   for att in data {
  //     if (att === null || att == '')
  //       msg = "Uh oh, looks like you skipped a step. Make sure you have picked a Team, Spin Value, and Letter before guessing."
  //       show_msg(msg)
  //       return
  //     }
  //   }
  //   if (att.guessLetter in ['A', 'E', 'I', 'O', 'U'] && att.spinValue > 0) {
  //     msg = "Oh snap! You picked a vowel, but didn't pick the negative spin value; that is pretty much cheating."
  //     show_msg(msg)
  //     return
  //   }
  // }

  // Guess function, ajax call to server api handled via node
  $scope.makingGuess = function(team, guess, spinValue) {
    console.log('Team = ' + team)
    console.log('Guess = ' + guess)
    console.log('spinValue = ' + spinValue)
    $http.get('api/guess/' + guess).
      success(function(data, status, headers, config) {
		letterStatus.markGuessed(guess)
        if (data.match === true){
          nHits = data.hits.length;
          cScore = nHits * parseInt(spinValue)
          puzzleScores.add(team, cScore)
          for (i = 0; i < data.hits.length; i++) {
            rowNumber = data.hits[i][0]
            colNumber = data.hits[i][1]
            $scope.puzzle[rowNumber][colNumber] = 1 
          }
        } else {
    		  letterStatus.markWrong(guess)
          //hold
        }
      });
  }
  
  // Reveal function toggles visibility of "hide" overlay blocks
  $scope.pReveal = function(){
    for (row in $scope.puzzle) {
      for (i = 0; i < $scope.puzzle[row].length; i++){
        $scope.puzzle[row][i] = 1
      }
    }
  }
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

wof.factory('LettersSvc', function($rootScope, $http) {
  var lettersGuessed = {'A': false, 'B': false, 'C': false, 'D': false, 'E': false, 'F': false, 'G': false, 'H': false, 'I': false, 'J': false, 'K': false, 'L': false, 'M': false, 'N': false, 'O': false, 'P': false, 'Q': false, 'R': false, 'S': false, 'T': false, 'U': false, 'V': false, 'W': false, 'X': false, 'Y': false, 'Z': false}
  var lettersWrong = {'A': false, 'B': false, 'C': false, 'D': false, 'E': false, 'F': false, 'G': false, 'H': false, 'I': false, 'J': false, 'K': false, 'L': false, 'M': false, 'N': false, 'O': false, 'P': false, 'Q': false, 'R': false, 'S': false, 'T': false, 'U': false, 'V': false, 'W': false, 'X': false, 'Y': false, 'Z': false}
  markGuessed = function(ltr) {
	lettersGuessed[ltr] = true  
  }
  markWrong = function(ltr) {
    lettersWrong[ltr] = true
  }
  return {
    markGuessed: markGuessed,
    markWrong: markWrong,
    lettersGuessed: lettersGuessed,
    lettersWrong: lettersWrong
  }
});
