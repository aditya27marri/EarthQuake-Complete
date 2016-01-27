var express = require('express');
var router = express.Router();
var mysql=require('./mysql.js');
/* GET home page. */
router.get('/Reports', function(req, res) {
	
	var sql_q="'Nebraska',"+
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
	"'District Of Columbia'";
	
	
	var connection= mysql.getConnection();
	
	var d = new Date();

	var query = "SELECT * FROM USGS_table_state where State_name in ("+sql_q +") order by USGS_seq_id_state desc limit 1000";
	console.log("select usgs state 10: "+query);
	connection.query(query,function(err,rows,fields){
		if (err) 
		{
			console.log("ERROR: " + err.message);
		}
		else
		{  
			for(var i in rows){
				
				rows[i].TimeOfOccurance_state= d.toUTCString( rows[i].TimeOfOccurance_state);
				
			}
			
			console.log(rows[i].TimeOfOccurance_state);
	
		        	res.render('reports',{ data:rows},function(err, result) {
				        // render on success
				        if (!err) {
				            res.end(result);
				        }
				        // render or error
				        else {
				            res.end('An error occurred');
				            console.log(err);
				        }
				    });
			
		}

	});
	connection.end();
});

// exports.statistics = function(req, res){
//   res.render('statistics', { title: 'Statistics' });
// };



module.exports = router;
