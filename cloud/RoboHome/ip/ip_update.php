<?php
include('../opendb.php');
$rpi_id = $_GET['id'];
$ip = $_GET['ip'];

$sql="UPDATE rpi SET ip_address='$ip' WHERE rpi_id='$rpi_id'";
echo $sql;

if (!mysql_query($sql))
{
	die('Error: ' . mysql_error());
}else{
	echo '<br>Updated<br>';
}
?>