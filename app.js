
/**
 * Module dependencies.
 */

//console.log('[' + new Data().toUTCString() + ']')
var express = require('express');
var routes = require('./routes');
var wof = require('./routes/wof');
var api = require('./routes/api');
var http = require('http');
var path = require('path');
var puzzle = require('./models/puzzle.js');

global.pText = puzzle.get_puzzle_text();
console.log(pText)
global.pMatrix = puzzle.build_puzzle_matrix(pText);
console.log(pMatrix)
global.bMatrix = puzzle.build_board_matrix(pMatrix);
console.log(bMatrix)

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only 1
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/main', wof.index);
app.get('/ang/:name', wof.angular);
app.get('/api/puzzle', api.puzzle);
app.get('/api/board', api.board);
app.get('/api/guess/:guessed', api.guess);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  console.log('Restart');
});
