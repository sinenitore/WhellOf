module.exports.build_puzzle_matrix = function(str){
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
  console.log(str)
  var puzzle = build_rows(str.split(' '))
  console.log(puzzle)
  //res.render('main', {data: puzzle});
  return puzzle
};

module.exports.build_board_matrix = function(pMatrix){
  var row_count = 0
  bMatrix = {row0: ''}
  for (row in pMatrix) {
    for (var i = 0; i < row.length; i++){
      if (row[i] === ' '){
        bMatrix['row' + row_count] += '0'
      } else {
        bMatrix['row' + row_count= += '1'
      }
    }
  }
  console.log(bMatrix)
  return bMatrix
}

module.exports.get_puzzle_text = function(filePath){
  console.log('API Puzzle function.')
  console.log(__dirname)
  //solutions = wof.gen_puzzle()
  var fs = require('fs');
  var path = require('path');
  if (filepath === 'undefined'){
    var filePath = path.resolve('puzzles', 'puzzle.txt')
  }
  var bufferString = fs.readFileSync(filePath)
  return bufferString.toString('UTF-8')
};

