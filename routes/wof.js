
/*
 * GET home page.
 */
//var wof = require('wof')
exports.index = function(req, res){
  //solutions = wof.gen_puzzle()
  puzzle = {line1: ['a', 'b', 'c', 'd', 'e', 'f'],
            line2: ['a', 'b', 'c', 'd', 'e', 'f'],
            line3: ['a', 'b', 'c', 'd', 'e', 'f']}
  console.log("From route.")
  console.log(puzzle)
  res.render('main', {data: puzzle});
};

