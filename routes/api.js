
/*
 * GET home page.
 */
//var wof = require('wof')

var puzzle = require('../models/puzzle')

exports.board = function(req, res){
  //pText = puzzle.get_puzzle_text();
  //pMatrix = puzzle.build_puzzle_matrix(pText);
  //bMatrix = puzzle.build_board_matrix(pMatrix);
  puzzleText = req.params.puzzleText
  console.log(puzzleText)
  pMatrix = puzzle.build_puzzle_matrix(puzzleText)
  bMatrix = puzzle.build_board_matrix(pMatrix)
  answer = {puzzle: bMatrix, pAnswer: pMatrix}
  res.json(answer)
}

exports.puzzle = function(req, res){
  var pMatrix = puzzle.get_puzzle_test()
  //res.render('main', {data: puzzle});
  res.json(pMatrix)
};

exports.puzzle_list = function(req, res){
  puzzleList = puzzle.get_puzzle_list()
  res.json(puzzleList)
}

exports.guess = function(req, res){
  function find_all(lineArray, searchStr, currentRow){
    var indices = []
    for (i = 0; i < lineArray.length; i++){
      if (searchStr.toLowerCase() == lineArray[i].toLowerCase()){
        indices.push([currentRow, i])
      }
    }
    return indices;
  }
  var guessed = req.params.guessed
  results = {match: false,}
  hitCoords = new Array()
  row_count = 0
  hit_count = 0
  for (row in pMatrix){
    var match = find_all(pMatrix[row], guessed, row_count)
    if (match.length > 0){
        hitCoords = hitCoords.concat(match)
        hit_count++
    }
    row_count++
  }
  if (hit_count > 0) {
    console.log(results.match)
    results.match = true
  }
  results.hits = hitCoords
  res.json(results)
}
