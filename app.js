var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var  http = require('http');
var  path = require('path');

var routes = require('./routes/index');
var success = require('./routes/success');

var statistics = require('./routes/statistics');
var alerts = require('./routes/alerts');


var reports = require('./routes/reports');
var threed = require('./routes/threed');


var recent5 = require('./routes/recent5')
  , forEach = require('./routes/forEach');
// , byDate = require('./routes/byDate');
var recentquakes = require('./routes/recentquakes');
var dashboard = require('./routes/dashboard');

var app = express();

// view engine setup
app.set('port', process.env.PORT || 3002);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/', success);
app.use('/', dashboard);


// From Aditya
app.get('/recent5', recent5.recent5);
app.post('/globe', forEach.globe);
app.get('/globe3d',function(req,res){
	res.render("globe/index.html");
});

app.get('/forState/:id',function(req,res){
  forEach.forState(req,res,req.param('id'));
});

app.get('/recent5State/:id',function(req,res){
  recent5.recent5State(req,res,req.param('id'));
});


app.get('/recentearthquakes', recentquakes);
app.get('/statistics', statistics);
app.get('/dashboard', dashboard);
app.get('/reports', reports);
app.get('/threed', threed);
app.get('/alerts', alerts);
app.post('/alertSupscription', alerts);




// For EarthquakesByDate
app.get('/getNoOfEarthQuakes', recent5.recent5);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

http.createServer(app).listen(app.get('port'), function(){

	  console.log('Express server listening on port ' + app.get('port'));

	});

module.exports = app;
