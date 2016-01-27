var express = require('express');
var router = express.Router();
var mysql=require('./mysql.js');
var nodemailer = require('nodemailer');
var twilio = require('twilio');
/* GET users listing. */


router.get('/getAverageMagnitude', function(req, res, next) {
	//"Select State_name, AVG(Magnitude_state) AS Magnitude From USGS_table_state GROUP BY State_name;",
	var sql_q="Select State_name, AVG(Magnitude_state) AS Magnitude "+
	"From USGS_table_state "+
	"where state_name in ("+
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
	")"+
	"GROUP BY State_name;"






		console.log("Working with Fetch data");


		var connection= mysql.getConnection();
		var query = connection.query(sql_q, function(err, rows){

			console.log(rows);

			if (err) {
				console.log("Hello Err "+err);
				res.error=err;
				//connection.end();
			}
			else{
				console.log("inside main else");
				if (rows.length > 0){
					var ret = JSON.stringify(rows);
					console.log(ret);
     				var obj = JSON.parse(ret);
					console.log(typeof(obj));
     				console.log(obj[0].State_name);
//					for (var i=0;i<obj.length;i++) {
//
//						console.log(obj[i].Place);
//
//
//						var New =obj[i].Place;
//
//						console.log(New.toString());
//						var SplitString= New.split(', ');
//
//
//
//				console.log(SplitString[1]);
//
//						}

					//console.log('Select Success');

				}
				else{
					console.log('Unable to select from db');
					res.error='Invalid User ID';

				}

			}
			res.send(obj);
			connection.end();

		});
  //res.send('respond with a resource');
});


router.get('/getNoOfEarthQuakes', function(req, res, next) {


	console.log("Working with Fetch data");
	var obj;

	var connection= mysql.getConnection();
	var sql_q="Select State_name, count(*) AS No_EQ "+
	"From USGS_table_state "+
	"where state_name in ("+
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
	")"+
	"GROUP BY State_name;"


//	var query = connection.query("Select State_name, count(*) AS No_EQ From USGS_table_state GROUP BY State_name;", function(err, rows){
	var query = connection.query(sql_q, function(err, rows){

		console.log(rows);

		if (err) {
			console.log("Hello Err "+err);
			res.error=err;
			//connection.end();
		}
		else{
			console.log("inside main else");
			if (rows.length > 0){
				var ret = JSON.stringify(rows);
				console.log(ret);
 				obj = JSON.parse(ret);
				console.log(typeof(obj));
 				console.log(obj[0].State_name);

			}
			else{
				console.log('Unable to select from db');
				res.error='Invalid';

			}

		}
		res.send(obj);
		//res.send('Data Base Updated Successfully!');
		connection.end();

	});
//res.send('respond with a resource');
});




router.get('/alertSupscription', function(req, res, next) {


	console.log("Working with Fetch data");


	var connection= mysql.getConnection();
	var query = connection.query("Insert State_name, count(*) AS No_EQ From USGS_table_state GROUP BY State_name;", function(err, rows){

		console.log(rows);

		if (err) {
			console.log("Hello Err "+err);
			res.error=err;
			//connection.end();
		}
		else{
			console.log("inside main else");
			if (rows.length > 0){
				var ret = JSON.stringify(rows);
				console.log(ret);
 				var obj = JSON.parse(ret);
				console.log(typeof(obj));
 				console.log(obj[0].State_name);
//				for (var i=0;i<obj.length;i++) {
//
//					console.log(obj[i].Place);
//
//
//					var New =obj[i].Place;
//
//					console.log(New.toString());
//					var SplitString= New.split(', ');
//
//
//
//			console.log(SplitString[1]);
//
//					}

				//console.log('Select Success');

			}
			else{
				console.log('Unable to select from db');
				res.error='Invalid';

			}

		}
		//res.send('Data Base Updated Successfully!');
		connection.end();

	});
//res.send('respond with a resource');
});


module.exports = router;
