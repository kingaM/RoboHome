<?php 
 // Connects to ContestGate Database 
$dbhost = "us-cdbr-azure-west-b.cleardb.com";
$dbusername = "bdd230a1dee8da";
$dbuserpassword = "57a02569";
$dbname = "robohom";

$link = mysql_connect ($dbhost, $dbusername, $dbuserpassword);

if (!$link) {
	echo "Cannot connect to database";
} else {
	mysql_select_db($dbname);
}
?> 