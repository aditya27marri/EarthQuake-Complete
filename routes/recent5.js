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
function recent5(req,res)
{
	//var connection = dataPool.getConnection();
	var connection=connect();
	var query = "SELECT * FROM USGS_table order by USGS_seq_id desc limit 10";
	console.log("select usgs first 10: "+query);
	connection.query(query,function(err,rows,fields){
		if (err) 
		{
			console.log("ERROR: " + err.message);
		}
		else
		{   console.log("DATA : "+JSON.stringify(rows));
			res.send(rows);
//		        	res.render('recent5',{ title:
//					'Recent 5 earthwuakes' ,rows:rows},function(err, result) {
//				        // render on success
//				        if (!err) {
//				            res.end(result);
//				        }
//				        // render or error
//				        else {
//				            res.end('An error occurred');
//				            console.log(err);
//				        }
//				    });
			
		}

	});
	connection.end();
	//dataPool.returnConnection(connection);
}

function recent5State(req,res,id)
{
	//var connection = dataPool.getConnection();
	var connection=connect();
	var query = "SELECT * FROM USGS_table_state where State_name='"+id+"' order by USGS_seq_id_state limit 5";
	console.log("select usgs state first 5: "+query);
	connection.query(query,function(err,rows,fields){
		if (err) 
		{
			console.log("ERROR: " + err.message);
		}
		else
		{   console.log("DATA : "+JSON.stringify(rows));
			
		        	res.render('recent5State',{ title:
					'Recent 5 state earthwuakes' ,rows:rows},function(err, result) {
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

exports.recent5 = recent5;
exports.recent5State = recent5State;