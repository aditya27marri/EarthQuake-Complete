

<?php
$q = intval($_GET['q']);

$con = mysqli_connect('earthquake.cjedykpuszoe.us-west-1.rds.amazonaws.com','earthquake280','earthquake','earthquake');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

  
$year = $_POST['year'];  
$sql = "SELECT * FROM USGS_table order by USGS_seq_id asc limit 5";  
$result = mysql_query($sql);  
while($row=mysql_fetch_array($result))  
{  
echo "<p>".$row['year']."</p>";  
}  
?> 
mysqli_close($con);
?>
