// var path = require('path');
// var express = require('express');

// var app = express();

// app.use(express.static(path.join(__dirname, 'dist')));
// app.set('port', process.env.PORT || 8080);

// var server = app.listen(app.get('port'), function() {
//   console.log('listening on port ', server.address().port);
// });

var history = require('connect-history-api-fallback');

var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')
app = express()
//add this middleware
app.use(history());    
app.use(express.static(path.join(__dirname, 'dist')));
var port = process.env.PORT || 5000
app.listen(port)
console.log('server started '+ port) 


// "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
// "start": "npm run dev",
// "build": "node build/build.js",