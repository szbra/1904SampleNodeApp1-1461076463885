/* jshint node:true */

/**
 * Module dependencies.
 */
var express = require('express'),
  routes = require('./routes'),
  cache = require('./routes/cache'),
  http = require('http'),
  path = require('path'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  logger = require('morgan'),
  errorHandler = require('errorhandler');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(logger('combined'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(errorHandler());
}

app.get('/', routes.index);
app.get("/cache/:key", cache.getCache);
app.put("/cache", cache.putCache);
app.delete("/cache/:key", cache.removeCache);

http.createServer(app).listen(app.get('port'), '0.0.0.0', function(){
  console.log('Express server listening on port ' + app.get('port'));
});
