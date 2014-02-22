
/*
 * GET home page.
 */
//var wof = require('wof')
exports.index = function(req, res){
  puzzle = {line1: ['a', 'b', 'c', 'd', 'e', 'f', '#'],
            line2: ['a', 'b', 'c', 'd', 'e', 'f'],
            line3: ['a', 'b', 'c', '#', 'd', 'e', 'f']}
  //res.render('main', {data: puzzle});
  res.render('main')
};

exports.angular = function(req, res){
  var name = req.params.name
  res.render('ang/' + name)
};

exports.newPuzzle = function(req, res){
  res.render('newPuzzle')
};
