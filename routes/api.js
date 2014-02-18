
/*
 * GET home page.
 */
//var wof = require('wof')
exports.puzzle = function(req, res){
  function build_rows(pArray){
    pz = {row0: ''} 
    var row_count = 0
    console.log("Before looping row_count: " + row_count)
    for (var i = 0; i < pArray.length; i++){
      console.log('Current Count: ' + i)
      console.log('Current Word: ' + pArray[i])
      console.log(pz['row' + row_count].length + pArray[i].length)
      if (pz['row' + row_count].length + pArray[i].length > 15) {
        pz['row' + row_count] = pz['row' + row_count].trim()
        row_count++
        pz['row' + row_count] = pArray[i]
      } else {
        pz['row' + row_count] += ' '
        pz['row' + row_count] += pArray[i]
      }
    }
    console.log("Last Element Index: " + row_count)
    console.log("Last Element: " + pz[row_count])
    pz['row' + row_count] = pz['row' + row_count].trim()
    return pz
  }
  console.log('API Puzzle function.')
  console.log(__dirname)
  //solutions = wof.gen_puzzle()
  var fs = require('fs');
  var path = require('path');
  var filePath = path.resolve('puzzles', 'puzzle.txt')
  var bufferString = fs.readFileSync(filePath)
  var puzzleText = bufferString.toString('UTF-8')
  console.log(puzzleText)
  var puzzle = build_rows(puzzleText.split(' '))
  console.log(puzzle)
  //res.render('main', {data: puzzle});
  res.json(puzzle)
};
