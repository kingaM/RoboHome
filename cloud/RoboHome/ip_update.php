<?php
include('opendb.php');
$rpi_id = $_GET['id'];
$ip = $_GET['ip'];

foreach($rpi_id as $rpi_id_arr){
	$sql="UPDATE rpi SET ip_address='$ip' WHERE rpi_id='$rpi_id_arr'";
	echo $sql;

	if (!mysql_query($sql))
	{
		die('Error: ' . mysql_error());
	}else{
		echo '<br>Updated<br>';
	}
}
?>