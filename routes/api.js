
/*
 * GET home page.
 */
//var wof = require('wof')

var puzzle = require('../models/puzzle')

exports.puzzle = function(req, res){
  var pMatrix = puzzle.get_puzzle_test()
  console.log(pMatrix)
  //res.render('main', {data: puzzle});
  res.json(pMatrix)
};

exports.guess = function(req, res){
  function find_all(str, searchStr){
    var StartIndex =0, searchStrLen = searchStr.length
    var index, indices = []
    str = str.toLowerCase()
    searchStr = searchStr.toLowerCase()
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      indices.push(index)
      startIndex = index + searchStrLen;
    }
    return indices;
  }
  var guessed = req.param.guessed
  hit = {match: false,
         loc: []}
  for (row in puzzle){
    var match = find_all(row, guessed)
    if (match.length > 0){
      hit.loc.concat(match)
    }
  }
}
