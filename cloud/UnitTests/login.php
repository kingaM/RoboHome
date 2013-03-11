<?php
require_once 'PHPUnit/Framework.php';
 
class LoginTest extends PHPUnit_Framework_TestCase
{
	public function testLoggingInShouldBeOk()
	{	
    $this->dispatch('/login/login');
    $csrf = $this->_getLoginFormCSRF();
    $this->resetResponse();
    $this->request->setPost(array(
        'login' => 'LOGIN',
        'password' => 'PASSWORD',
        'csrfLogin' => $csrf,
        'ok' => 'Login',
    ));
    $this->request->setMethod('POST');
    $this->dispatch('/login/login');
    $this->assertRedirectTo('/');
    $this->assertTrue(Zend_Auth::getInstance()->hasIdentity());
	}
}
?>