<?php 
 // Connects to ContestGate Database 
$dbhost = "host";
$dbusername = "username";
$dbuserpassword = "password";
$dbname = "robohom";

$link = mysql_connect ($dbhost, $dbusername, $dbuserpassword);

if (!$link) {
	echo "Cannot connect to database";
} else {
	mysql_select_db($dbname);
}
?> 