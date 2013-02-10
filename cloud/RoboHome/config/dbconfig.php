<?php

/*
$connectionInfo = array("UID" => "robohome@kaajaykdh7", "pwd" => "comp2014!", "Database" => "robohome", "LoginTimeout" => 30, "Encrypt" => 1);
$serverName = "tcp:kaajaykdh7.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);
*/
// DB connection info
$host = "tcp:kaajaykdh7.database.windows.net";
$user = "robohome@kaajaykdh7";
$pwd = "comp2014!";
$db = "robohome";
// Connect to database.
try {
    $conn = new PDO( "sqlsrv:Server= $host ; Database = $db ", $user, $pwd);
    $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
}
catch(Exception $e){
    die(var_dump($e));
}
/*
$sql_select = "SELECT * FROM users";
$stmt = $conn->query($sql_select);
$registrants = $stmt->fetchAll(); 

    foreach($registrants as $registrant) {
        echo $registrant['email']."</br>";
    }
*/
?>