var ejs=require('ejs');
var mysql=require('mysql');

var getConnection=function()
{  
	var connection=mysql.createConnection(
			{
				host: 'earthquake.cjedykpuszoe.us-west-1.rds.amazonaws.com',
				user: 'earthquake280',
				password:'earthquake',
				port: 3306,
				database: 'earthquake'	
			});
	console.log('Connection created');
	
	
	
	//console.log(connection);
	return connection;
};

exports.getConnection=getConnection;
