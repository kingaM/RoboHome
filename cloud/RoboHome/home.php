<?php
//Always place this code at the top of the Page
session_start();
if (!isset($_SESSION['id'])) {
    // Redirection to login page twitter or facebook
    header("location: index.php?e=1");
}
	include('header.php');
?>
		<!-- Table -->
<p>
<div class="well">
<?php
echo '<h1>Welcome</h1>';
echo '<br/>Name : ' . $_SESSION['username'];
echo '<br/>Email : ' . $_SESSION['email'];
echo '<br/>You are login with : ' . $_SESSION['oauth_provider'];
echo '<br/>Logout from <a href="logout.php?logout">' . $_SESSION['oauth_provider'] . '</a>';
?>
</p>
</div>
</p>

 <table class="table">
              <thead>
                <tr>
                  <th width="6%">#</th>
                  <th width="14%">Name</th>
                  <th width="16%">Status</th>
                  <th width="22%">IP Adress</th>
                  <th width="42%">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Home</td>
                  <td>Available</td>
                  <td>192.168.0.1</td>
                  <td><button class="btn btn-mini btn-primary" type="button">Edit</button> <button class="btn btn-mini btn-danger" type="button">Delete</button></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Office</td>
                  <td>Available</td>
                  <td>192.168.0.2</td>
                  <td><button class="btn btn-mini btn-primary" type="button">Edit</button> <button class="btn btn-mini btn-danger" type="button">Delete</button></td>
                </tr>
              </tbody>
            </table>

      <hr>

      <div class="footer">
        <p>&copy; RoboHome 2013</p>
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
