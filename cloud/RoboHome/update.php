<?php
include('header.php');
include('opendb.php');
//robohome_update.zip
if (isset($_POST['submitted'])) {
	if($_POST['password']=='comp2014'){
		$target_path = "update/";
		$target_path = $target_path . basename( $_FILES['uploadedfile']['name']);
		$version = $_POST['version'];
		$sql="UPDATE version SET ver_num='$version' WHERE id='1'";
		if (!mysql_query($sql))
		{
		  die('Error: ' . mysql_error());
		}
		if(move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $target_path)) {
			echo "The file ".  basename( $_FILES['uploadedfile']['name']). " has been uploaded";
		} else{
			echo "There was an error uploading the file, please try again!";
		}
	}else{
		echo 'Wrong Password';
	}
}
	
?>
<head>
    <style type="text/css">
      body {
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #f5f5f5;
      }

      .form-signin {
        max-width: 400px;
        padding: 19px 29px 29px;
        margin: 0 auto 20px;
        background-color: #fff;
        border: 1px solid #e5e5e5;
        -webkit-border-radius: 5px;
           -moz-border-radius: 5px;
                border-radius: 5px;
        -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.05);
           -moz-box-shadow: 0 1px 2px rgba(0,0,0,.05);
                box-shadow: 0 1px 2px rgba(0,0,0,.05);
      }
      .form-signin .form-signin-heading,
      .form-signin .checkbox {
        margin-bottom: 10px;
      }
      .form-signin input[type="text"],
      .form-signin input[type="password"] {
        font-size: 16px;
        height: auto;
        margin-bottom: 15px;
        padding: 7px 9px;
      }

    </style>
  </head>


    <div class="container">

      <form enctype="multipart/form-data" class="form-signin" action="update.php" method="post">
        <h2 class="form-signin-heading">Please select update:</h2>
        <input name="uploadedfile" type="file" />
        <input type="text" name="version" class="input-block-level" placeholder="Version">
        <input type="password" name="password" class="input-block-level" placeholder="Password">
        <label class="checkbox">
        <button class="btn btn-large btn-primary" type="submit">Upload</button>
        <input type="hidden" name="submitted" value="TRUE" />
      </form>

    </div> <!-- /container -->

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

  </body>
</html>
