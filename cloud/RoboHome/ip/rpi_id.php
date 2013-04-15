<?php
include('../opendb.php');
$ip = $_GET['ip'];

$query = "SELECT * FROM rpi WHERE ip_address = '$ip'";
$result = mysql_query ($query);
$rpi = mysql_fetch_assoc($result);
$rpi_id = $rpi["rpi_id"];
echo $rpi_id;
?>