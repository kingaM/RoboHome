<?php
$e = $_GET['e'];
include('header.php');
session_start();
if (isset($_SESSION['id'])) {
    // Redirection to login page twitter or facebook
    header("location: home.php");
}

if (array_key_exists("login", $_GET)) {
    $oauth_provider = $_GET['oauth_provider'];
    if ($oauth_provider == 'google') {
        header("Location: login-google.php");
    } 
}
?>

<!-- Carousel
    ================================================== -->

<div id="myCarousel" class="carousel slide">
  <div class="carousel-inner">
    <div class="item active"> <img src="img/examples/slide-01.jpg" alt="">
      <div class="container">
        <div class="carousel-caption">
          <h1>Try RoboHome?</h1>
          <p class="lead">We make Home Automation set up fast, easy and cheap.</p>
          <a class="btn btn-large btn-primary" href="#">Download</a> </div>
      </div>
    </div>
    <div class="item"> <img src="img/examples/slide-02.jpg" alt="">
      <div class="container">
        <div class="carousel-caption">
          <h1>Another example headline.</h1>
          <p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
          <a class="btn btn-large btn-primary" href="#">Learn more</a> </div>
      </div>
    </div>
    <div class="item"> <img src="img/examples/slide-03.jpg" alt="">
      <div class="container">
        <div class="carousel-caption">
          <h1>One more for good measure.</h1>
          <p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
          <a class="btn btn-large btn-primary" href="#">Browse gallery</a> </div>
      </div>
    </div>
  </div>
  <a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a> <a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a> </div>
<!-- /.carousel -->

<?php
if($e=='1'){
echo '
<div class="alert alert-block alert-error fade in">
            <button type="button" class="close" data-dismiss="alert">&times;  </button>
  <p>Please Login First.  </p>
</div>
' ;
}
?>

<hr>

<!-- Example row of columns -->
<div class="row-fluid">
  <div class="span4">
    <h2>Login to My Account</h2>
    <p>Login with your Google account to manage your home. </p>
    <p><a href="login-google.php"><img src="img/logo.png" width="175" height="60" /></a></p>
  </div>
  <div class="span4">
    <h2>Register</h2>
    <p>Register a google account to get started.</p>
    <p><a class="btn" href="http://accounts.google.com">Register Now</a></p>
  </div>
  <div class="span4">
    <h2>Download</h2>
    <p>Download and get it running now.</p>
    <p><a class="btn" href="https://github.com/michboon/comp2014.git">Download</a></p>
  </div>
</div>
<hr>
<div class="footer">
<center>&copy; RoboHome 2013</center>
</div>
</div>
<!-- /container --> 

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
<script src="js/bootstrap-carousel.js">