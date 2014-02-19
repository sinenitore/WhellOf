module.exports.build_puzzle_matrix = function(str){
  function build_rows(pArray){
    pz = {row0: ''}
    var row_count = 0
    console.log("Before looping row_count: " + row_count)
    for (var i = 0; i < pArray.length; i++){
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
  bMatrix = new Object()
  for (row in pMatrix) {
    bMatrix['row' + row_count] = ''
    for (var i = 0; i < pMatrix[row].length; i++){
      if (pMatrix[row][i] === ' '){
        bMatrix['row' + row_count] += '0'
      } else {
        bMatrix['row' + row_count] += '1'
      }
    }
    row_count++
  }
  return bMatrix
}

module.exports.get_puzzle_text = function(filePath){
  console.log('API Puzzle function.')
  console.log(__dirname)
  //solutions = wof.gen_puzzle()
  var fs = require('fs');
  var path = require('path');
  if (typeof filePath === undefined){
    console.log("File Path is undeifined.")
    var filePath = path.resolve('puzzles', 'puzzle.txt')
    console.log(filePath)
  }
  var filePath = path.resolve('puzzles', 'puzzle.txt')
  var bufferString = fs.readFileSync(filePath)
  console.log(filePath)
  return bufferString.toString('UTF-8')
};

