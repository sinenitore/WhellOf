
/*
 * GET home page.
 */
//var wof = require('wof')

var puzzle = require('../models/puzzle')

exports.board = function(req, res){
  //pText = puzzle.get_puzzle_text();
  //pMatrix = puzzle.build_puzzle_matrix(pText);
  //bMatrix = puzzle.build_board_matrix(pMatrix);
  console.log(bMatrix)
  res.json(bMatrix)
}

exports.puzzle = function(req, res){
  var pMatrix = puzzle.get_puzzle_test()
  //res.render('main', {data: puzzle});
  res.json(pMatrix)
};

exports.guess = function(req, res){
  function find_all(str, searchStr, currentRow){
    var startIndex =0
    var searchStrLen = searchStr.length
    var index, indices = []
    str = str.toLowerCase()
    searchStr = searchStr.toLowerCase()
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      indices.push([currentRow, index])
      startIndex = index + searchStrLen;
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
//      hitCoords.concat(match)
      for (k = 0; k < match.length; k++){
        hitCoords.push(match[k])
        hit_count++
      }
    }
    row_count++
  }
  if (hit_count > 0) {
    results.match = true
  }
  results.hits = hitCoords
  res.json(results)
}
