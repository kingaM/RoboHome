<?php
//Terrence Chiu

//Always place this code at the top of the Page
session_start();
if (!isset($_SESSION['id'])) {
    // Redirection to login page twitter or facebook
    header("location: index.php?e=1");
}
$id = $_SESSION['id'];
include('opendb.php');
include('header.php');
//Add RPI
if (isset($_POST['submitted'])) {
	$name = $_POST['name'];
	$ip = $_POST['ip'];
	
	$res = mysql_query("SELECT * FROM rpi WHERE ip_address = '$ip'");
	if(mysql_num_rows($res) == 0) {
		$sql="INSERT INTO rpi (name, status, ip_address) VALUES ('$name', 0, '$ip')";
		if (!mysql_query($sql))
		{
			  die('Error: ' . mysql_error());
		}
	} else {
		$rpi = mysql_fetch_assoc($res);
		$rpi_id = $rpi["rpi_id"];
	}
	mysql_query("INSERT INTO rpi_users (rpi_id, users_id) VALUES ('$rpi_id', '$id')");
	echo ' Thank You! Added new RPi ';
}
//Delete RPI
if (isset($_POST['delete'])) {
	$row_id = $_POST['row_id'];
	$sql="DELETE FROM rpi_users WHERE users_id ='$id' AND rpi_id='$row_id'";
	if (!mysql_query($sql))
	{
		  die('Error: ' . mysql_error());
	}
	echo ' Deleted ';
}
?>

<!-- Users Table -->
<p>
<div class="well">
<?php
echo '<h1>Welcome '. $_SESSION['username'] .' !</h1>';
echo '<br/><font color="#A52A2A">Email</font> : ' . $_SESSION['email'];
echo '<br/><font color="#A52A2A">You are login with :</font> ' . $_SESSION['oauth_provider'];
echo '<br/><a href="logout.php?logout">Logout</a>';
?>
</p>
</div>

</p>
<a href="#myModal" role="button" class="btn btn-small btn btn-warning" data-toggle="modal">Add a new RPi</a>
 <p><!-- Modal -->
<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 id="myModalLabel">Add a new RPi</h3>
  </div>
  
  <form action="home.php" method="post">
  
  <div class="modal-body">
  Leave "name" empty if adding existing RPi.
    <p>Name:<br /><input name="name" type="text" placeholder="Ex: Home 1"></p>
    <p>IP Address:<br /><input name="ip" type="text" placeholder="Ex: 192.168.0.1"></p>
  </div>
  <div class="modal-footer">
    <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
    <button type="submit" class="btn btn-primary">Submit</button>
  </div>
  <input type="hidden" name="submitted" value="TRUE" />
  </form>
</div>
</p>

 <table class="table">
              <thead>
                <tr>
                  <th width="6%">#</th>
                  <th width="14%">Name</th>
                  <th width="16%">Status</th>
                  <th width="22%">IP Address</th>
                  <th width="42%">Action</th>
                </tr>
   </thead>
              <tbody>
              <?php
              $query = "SELECT * FROM rpi_users JOIN rpi ON rpi_users.rpi_id = rpi.rpi_id WHERE rpi_users.users_id = '$id'";
			  $result = mysql_query ($query);
			  $count = 1;
				while($row = mysql_fetch_assoc($result))
				{
					echo '<tr>';
					echo '<td>'.$count.'</td>';
					echo '<td><a href="http://'.$row["ip_address"].'">'.$row["name"].'</td></a>';
					if($row["status"] == '0'){echo '<td>Not available</td>';}else{echo '<td>Available</td>';}
					echo '<td>'.$row["ip_address"].'</td>';
					echo '<form action="home.php" method="post">';
					//<button class="btn btn-mini btn-primary" type="button">Edit</button>
					echo '<input type="hidden" name="row_id" value="'.$row["rpi_id"].'" />';
					echo '<td><button type="submit" class="btn btn-mini btn-danger">Delete</button></td>';
					echo '<input type="hidden" name="delete" value="TRUE" />';
					echo '</form>';
					echo '</tr>';
					$count++;
				}
			  ?>             
                
              </tbody>
        </table>

      <hr>

      <div class="footer">
        <center><p>&copy; RoboHome 2013</p></center>
      </div>

    </div> <!-- /container -->

<!-- /.container -->



    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="js/jquery.js"></script>
    <script src="js/bootstrap-transition.js"></script>
    <script src="js/bootstrap-alert.js"></script>
    <script src="js/bootstrap-modal.js"></script>
    <script src="js/bootstrap-dropdown.js"></script>
    <script src="js/bootstrap-scrollspy.js"></script>
    <script src="js/bootstrap-tab.js"></script>
    <script src="js/bootstrap-tooltip.js"></script>
    <script src="js/bootstrap-popover.js"></script>
    <script src="js/bootstrap-button.js"></script>
    <script src="js/bootstrap-collapse.js"></script>
    <script src="js/bootstrap-carousel.js"></script>
    <script src="js/bootstrap-typeahead.js"></script>
    <script>
      !function ($) {
        $(function(){
          // carousel demo
          $('#myCarousel').carousel()
        })
      }(window.jQuery)
    </script>
  </body>
</html>
