

var express = require('express');
var router = express.Router();
var mysql=require('./mysql.js');
var nodemailer = require('nodemailer');
var twilio = require('twilio');
var ejs=require("ejs");
var client1 = new twilio.RestClient('AC966326f4f539f7344caeb70364038eae', '07f7bc2e7ae7c7a6b7b178e43bb17c77');

/* GET home page. */
router.get('/alerts', function(req, res) {
  res.render('alerts');
});

// exports.statistics = function(req, res){
//   res.render('statistics', { title: 'Statistics' });
// };
router.post('/alertSupscription', function(req,res,next) {
	var name=req.body.name;
	var email = req.body.email;
	var mobile = req.body.tel;
	var state = req.body.state_name;
	var date = new Date();
	var connection = mysql.getConnection();
	var query = connection.query("INSERT INTO Eq_Alert_Table set ? ", {
		"Name" : name,
		"Email" : email,
		"PhoneNo" : mobile,
		"Location" : state,
		"TimeStamp" : date.getTime(),
	}, function(err, rows) {
		console.log('executed query');
		console.log(err);
		console.log(rows);
		if (err) {
			res.error = err;
		} else {
			if (rows.affectedRows > 0) {	
				var transporter1 = nodemailer
				.createTransport({
					service : 'yahoo',
					auth : {
						user : 'rahuljain207@yahoo.com',
						pass : 'kinngs1993'
					}
				});

		var mailOptions = {

			from : 'rahuljain207@yahoo.com',
			to : email,
			subject : 'EarthQuake Alert',
			text : 'Success Earthquake Subscription'		

		};
		transporter1
				.sendMail(
						mailOptions,
						function(
								error,
								info) {
							if (error) {
								return console
										.log(error);
							}
							console
									.log('Message sent: '+ info);

						});	
		client1.sms.messages.create( {
			to: mobile, 
			from: "+16692001196", 
			body:"Hi, You have subscribed for EarthQuake Alerts",   
		}, function(err, message) { 
			 if (!err) {
				    
			        console.log('Success! The SID for this SMS message is:');
			        res.render('successMsg.ejs',{title:
						'succesfully subscribed ' ,message:"succesfully subscribed to alerts",back:'alerts'},function(err, result) {
						// render on success
						if (!err) {
							res.end(result);
						}
						// render or error
						else {
						
								res.render('error-mes',{ title:
				'Unable to Subscribe !! ' ,message: 'Please check all the values! Try again',back:'alerts'});
							console.log(err);
						}
					});

			    } else {
			    	
			    	console.log(err);
		
			        console.log('Oops! There was an error.');
			    }
		});			
				console.log('user inserted into db');
				res.code = 200;
			} else {
				console.log('Unable to insert user into db');
				res.error = 'Invalid User ID';
			}
		}
		// res.send({'Data Base Updated Successfully!'});
		connection.end();
	});
	// res.send('respond with a resource');
});
module.exports = router;