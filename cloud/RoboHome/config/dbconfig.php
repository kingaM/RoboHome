<?php

define('DB_SERVER', 'us-cdbr-azure-west-b.cleardb.com');
define('DB_USERNAME', 'bdd230a1dee8da');
define('DB_PASSWORD', '57a02569');
define('DB_DATABASE', 'robohom');

define('USERS_TABLE_NAME', 'users');

$connection = mysql_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD) or die(mysql_error());
$database = mysql_select_db(DB_DATABASE) or die(mysql_error());
?>