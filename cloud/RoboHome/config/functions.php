<?php

require 'dbconfig.php';

class User {

    function checkUserGoogle($uid, $oauth_provider, $username, $email)
	{
		
        $userstable = users;
		/*
        $query = mysql_query("SELECT * FROM `$userstable` WHERE email = '$email' and oauth_provider = '$oauth_provider'") or die(mysql_error());
        $result = mysql_fetch_array($query);
		*/
		try {
		$sql_select = "SELECT * FROM `$userstable` WHERE email = '$email' and oauth_provider = '$oauth_provider'";
		
		$stmt = $conn->query($sql_select);
		
		$registrant = $stmt->fetch(); 
		}catch(Exception $e) {
    		die(var_dump($e));
		}
		
        if (!empty($registrant)) {
            # User is already present
        } else {
			/*
            #user not present. Insert a new Record
            $query = mysql_query("INSERT INTO `$userstable` (oauth_provider, oauth_uid, username, email) VALUES ('$oauth_provider', '$uid', '$username', '$email')") or die(mysql_error());
            $query = mysql_query("SELECT * FROM `$userstable` WHERE email = '$email' and oauth_provider = '$oauth_provider'");
            $result = mysql_fetch_array($query);
            return $result;
			*/
			try {
			$sql_insert ="INSERT INTO `$userstable` (oauth_provider, oauth_uid, username, email) VALUES ('$oauth_provider', '$uid', '$username', '$email')" ;
			$stmt = $conn->prepare($sql_insert);
			$stmt->execute();
			
			$sql_select = "SELECT * FROM `$userstable` WHERE email = '$email' and oauth_provider = '$oauth_provider'";
			$stmt = $conn->query($sql_select);
			
			$registrant = $stmt->fetch(); 
			}catch(Exception $e) {
    			die(var_dump($e));
			}	
			echo $registrant['email'];
        	return $registrant;
			
        }
		echo $registrant['email'];
        return $registrant;
    }

    

}

?>
