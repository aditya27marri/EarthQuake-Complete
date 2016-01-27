var express = require('express');
var router = express.Router();
var mysql      = require('mysql');

var pool      =    mysql.createPool({
	connectionLimit : 20, //important
	host     : 'earthquake.cjedykpuszoe.us-west-1.rds.amazonaws.com',
	user     : 'earthquake280',
	password : 'earthquake',
	database : 'earthquake',
	debug    :  false
});



/* GET home page. */
router.get('/dashboard', function(req, res, next) {
  console.log("inside render");
	res.render('dashboard');
});

module.exports = router;


console.log("inside dashboard");


router.post('/getLatestEq', function(req, res, next) {
	console.log('comes here...');
	var date = new Date();
	date.setSeconds(date.getSeconds()-15);
	var last15econds = (new Date).getTime();
	var last15second=[1449154120000,1449151311120,1449146602000];
  var random = Math.floor(Math.random() * 3);

	var queryString = " select place, Longitude, Latitude, Magnitude from USGS_table where timeofoccurance > "+last15second[random] +" and " +
	" state in ("+
	"'Nebraska',"+
	"'North Dakota',"+
	"'Utah',"+
	"'Vermont',"+
	"'Iowa',"+
	"'Minnesota',"+
	"'New Hampshire',"+
	"'South Dakota',"+
	"'Idaho',"+
	"'Montana',"+
	"'Hawaii',"+
	"'Wyoming',"+
	"'Colorado',"+
	"'Oklahoma',"+
	"'Texas',"+
	"'Kansas',"+
	"'Delaware',"+
	"'Massachusetts',"+
	"'Wisconsin',"+
	"'Maine',"+
	"'Virginia',"+
	"'Indiana',"+
	"'Kentucky',"+
	"'Ohio',"+
	"'Maryland',"+
	"'Oregon',"+
	"'Pennsylvania',"+
	"'Washington',"+
	"'Michigan',"+
	"'Arkansas',"+
	"'Florida',"+
	"'New York',"+
	"'North Carolina',"+
	"'Arizona',"+
	"'Missouri',"+
	"'Tennessee',"+
	"'Rhode Island',"+
	"'Connecticut',"+
	"'Illinois',"+
	"'Alabama',"+
	"'New Mexico',"+
	"'Georgia',"+
	"'California',"+
	"'New Jersey',"+
	"'Louisiana',"+
	"'Mississippi',"+
	"'Alaska',"+
	"'South Carolina',"+
	"'Nevada',"+
	"'West Virginia',"+
	"'District Of Columbia'"+
	")";

	console.log(queryString);
	pool.getConnection(function(err,connection){
		connection.query(queryString, function(err, rows, fields) {
			var data='[';
			if (err) res.send("error");
			else{
				for (var i in rows) {
					data = data+'{"place":"' + rows[i].place+'","lon":'+rows[i].Longitude+',"lat":'+rows[i].Latitude+',"Magnitude":'+rows[i].Magnitude+'},';
				}
				data = data.slice(0,-1);
				data = data + ']';
				console.log(data);
				res.send(data);
			}
		});
	connection.release();
	});
});


router.post('/lastfiveEq', function(req, res, next) {
	console.log('comes here...');


	var queryString = " select place, Magnitude from USGS_table where  " +
	" state in ("+
	"'Nebraska',"+
	"'North Dakota',"+
	"'Utah',"+
	"'Vermont',"+
	"'Iowa',"+
	"'Minnesota',"+
	"'New Hampshire',"+
	"'South Dakota',"+
	"'Idaho',"+
	"'Montana',"+
	"'Hawaii',"+
	"'Wyoming',"+
	"'Colorado',"+
	"'Oklahoma',"+
	"'Texas',"+
	"'Kansas',"+
	"'Delaware',"+
	"'Massachusetts',"+
	"'Wisconsin',"+
	"'Maine',"+
	"'Virginia',"+
	"'Indiana',"+
	"'Kentucky',"+
	"'Ohio',"+
	"'Maryland',"+
	"'Oregon',"+
	"'Pennsylvania',"+
	"'Washington',"+
	"'Michigan',"+
	"'Arkansas',"+
	"'Florida',"+
	"'New York',"+
	"'North Carolina',"+
	"'Arizona',"+
	"'Missouri',"+
	"'Tennessee',"+
	"'Rhode Island',"+
	"'Connecticut',"+
	"'Illinois',"+
	"'Alabama',"+
	"'New Mexico',"+
	"'Georgia',"+
	"'California',"+
	"'New Jersey',"+
	"'Louisiana',"+
	"'Mississippi',"+
	"'Alaska',"+
	"'South Carolina',"+
	"'Nevada',"+
	"'West Virginia',"+
	"'District Of Columbia'"+
	") order by timeofoccurance desc limit 5";

	console.log(queryString);
	pool.getConnection(function(err,connection){
		connection.query(queryString, function(err, rows, fields) {
			var data='';
			if (err) res.send("error");
			else{
				for (var i in rows) {
					data = data+ rows[i].place+' with Magnitude: '+rows[i].Magnitude+"|";
				}
				data = data.slice(0,-1);
				console.log(data);
				res.send(data);
			}
		});
	connection.release();
	});
});

module.exports = router;

