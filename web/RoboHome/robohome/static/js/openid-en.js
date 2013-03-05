/*
    Based upon: https://github.com/mitsuhiko/flask-openid
    
    This code is licensed under the New BSD License: https://github.com/mitsuhiko/flask-openid/blob/master/LICENSE
*/

var providers_large = {
	google : {
		name : 'Google',
		url : 'https://www.google.com/accounts/o8/id'
	},
};

openid.locale = 'en';
openid.sprite = 'en'; // reused in german& japan localization
openid.demo_text = 'In client demo mode. Normally would have submitted OpenID:';
openid.signin_text = 'Sign-In';
openid.image_title = 'log in with {provider}';
