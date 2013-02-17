<?php
	include('opendb.php');
	$query = "select * from version";
	$result = mysql_query ($query);
	while($row = mysql_fetch_assoc($result))
	{
		echo $row["ver_num"];
	}
?>