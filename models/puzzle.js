module.exports.build_puzzle_matrix = function(str){
  if (typeof lineLength === 'undefined'){
    console.log("LinLength not set, setting to 15")
    lineLength = 15
  } else {
    console.log("LineLength appears to be defined.")
  }
  console.log("-- Line Length :" + lineLength)
  function build_rows(pArray){
    pz = new Object()
    new_row = true
    var row_count = 0
    for (var i = 0; i < pArray.length; i++){
      newArray = pArray[i].split("")
      if (new_row === false){
        if (pz[row_count].length + newArray.length + 1 > lineLength) {
          row_count++
          new_row = true
        }
      }
      console.log('New Row: ' + new_row)
      if (new_row === true){
        pz[row_count] = newArray
        new_row = false
      } else {
        pz[row_count].push(" ")
        pz[row_count] = pz[row_count].concat(newArray)
      }
    }
    console.log(pz)
    return pz
  }

  function pad_rows(pMatrix){
    for (row in pMatrix){
      reqPadding = lineLength - pMatrix[row].length
      if (reqPadding > 0){
        symPad = Math.floor(reqPadding/2)
        backPad = reqPadding % 2
        padArray = new Array()
        for (j = 0; j < symPad; j++){
          padArray.push(" ")
        }
        pMatrix[row] = padArray.concat(pMatrix[row])
        pMatrix[row] = pMatrix[row].concat(padArray)
        if (backPad == 1){
          pMatrix[row] = pMatrix[row].concat([' '])
        }
      }
    }
    console.log(pMatrix)
    return pMatrix
  }
  console.log(str)
  str = str.trim()
  var puzzle = build_rows(str.split(" "))
  console.log(puzzle)
  paddedPuzzle = pad_rows(puzzle)
  console.log(paddedPuzzle)
  //res.render('main', {data: puzzle});
  return paddedPuzzle
};

module.exports.build_board_matrix = function(pMatrix){
  var row_count = 0
  bMatrix = new Object()
  for (row in pMatrix) {
    bMatrix[row_count] =[] 
    for (var i = 0; i < pMatrix[row].length; i++){
      if (",-.?!-';".indexOf(pMatrix[row][i]) > -1){
        bMatrix[row_count].push(1)
      } else {
        bMatrix[row_count].push(0)
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

