/*
 Modules
 */
var express = require('express'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	compress = require('compression');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/*
 Set App variables
 */
app.set('port', process.env.PORT || 4000);
app.set('environment', process.env.NODE_ENV || 'development');
app.set('client', 'client/production');
app.set('version', 1);

/*
 Set App configuration
 */
app.use(express.static(__dirname + '/' + app.get(('client'))));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compress());

/*
 Load the client side
 */
app.get('/', function(req, res) {
	res.send(app.get('client') + '/index.html');
});

/*
Https
 */
require('./server/totems').http(app);

/*
 Sockets
 */
io.on('connection', function(socket) {
	require('./server/totems').events(socket);
});

/*
 Start it up
 */
http.listen(app.get('port'), function() {
	console.log('Doin\' something fun over at :' + app.get('port'));
});

/*
 Makes this module public
 */
module.exports = app;