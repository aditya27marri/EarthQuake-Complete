var mysql=require('mysql');
function connect(){
	var connection =  mysql.createConnection({
		host:'earthquake.cjedykpuszoe.us-west-1.rds.amazonaws.com',
		port:'3306',
		user:'earthquake280',
		password:'earthquake',
		database:'earthquake'	
	});
	connection.connect();
	return connection;
}
function forMagnitude(req,res,id)
{
	//var connection = dataPool.getConnection();
	var connection=connect();
	var query = "SELECT * FROM USGS_table where Magnitude >='"+id+ "'order by USGS_seq_id desc limit 10";
	console.log("select usgs magnitude 10: "+query);
	connection.query(query,function(err,rows,fields){
		if (err) 
		{
			console.log("ERROR: " + err.message);
		}
		else
			{   
			console.log("DATA : "+JSON.stringify(rows));
			//have to place a new ejs file
			res.render('recent5Magnitude',{ title:
				'magnitude earthquakes' ,rows:rows},function(err, result) {
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
	//dataPool.returnConnection(connection);
}

function forState(req,res,id)
{
	//var connection = dataPool.getConnection();
	var connection=connect();
	var query = "SELECT * FROM USGS_table_state where State_name='"+ id + "'order by USGS_seq_id_state desc limit 10";
	console.log("select usgs state 10: "+query);
	connection.query(query,function(err,rows,fields){
		if (err) 
		{
			console.log("ERROR: " + err.message);
		}
		else
			{   
		console.log("\n\n\n\nPrinting ForState Values::::\n\n\n\n")
		console.log("DATA : "+JSON.stringify(rows));
		// console.log("time : "+JSON.stringify(rows.TimeOfOccurance_state));
		var time = JSON.stringify(rows.TimeOfOccurance_state);
		var date = new Date(time);
        res.send(rows);
		//res.send(rows:rows);
		// console.log("time ch : "+date.toString());
		// res.send(this);
		/*res.render('state',{ title:
			'state earthquakes' ,rows:rows},function(err, result) {
				        // render on success
				        if (!err) {
				        	res.send(result);
				        }
				        // render or error
				        else {
				        	res.end('An error occurred');
				        	console.log(err);
				        }
				    });*/
		
	}

});
	connection.end();
	//dataPool.returnConnection(connection);
}


function globe(req,res)
{
	//var connection = dataPool.getConnection();
	var connection=connect();
	var query = "SELECT Latitude,Longitude,Magnitude FROM USGS_table order by USGS_seq_id asc limit 10000";
	console.log("select usgs globe 10: "+query);
	connection.query(query,function(err,rows,fields){
		if (err) 
		{
			console.log("ERROR: " + err.message);
		}
		else
		{   console.log("DATA for globe : "+JSON.stringify(rows));
		var array =[];
		var j=0;
		for (var i in rows)
			{
			var new1=(rows[i].Latitude);
			var new2=(rows[i].Longitude); 
			var new3=(rows[i].Magnitude)/10;
			array[j] = new1;
			array[j+1] = new2;
			array[j+2] = new3;
			j=j+3;
			}
		    console.log("DATA for array : "+JSON.stringify(array));
		    res.send(array);
		}

	});
	connection.end();
	//dataPool.returnConnection(connection);
}


exports.forState = forState;

exports.globe = globe;