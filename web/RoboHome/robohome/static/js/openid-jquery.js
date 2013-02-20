/*
	Simple OpenID Plugin
	http://code.google.com/p/openid-selector/
	
	This code is licensed under the New BSD License.
*/

var providers;
var openid;
(function ($) {
openid = {
	version : '1.3', // version constant
	demo : false,
	demo_text : null,
	cookie_expires : 6 * 30, // 6 months.
	cookie_name : 'openid_provider',
	cookie_path : '/',

	img_path : '../../satic/img/',
	locale : null, // is set in openid-<locale>.js
	sprite : null, // usually equals to locale, is set in
	// openid-<locale>.js
	signin_text : null, // text on submit button on the form
	all_small : false, // output large providers w/ small icons
	no_sprite : false, // don't use sprite image
	image_title : '{provider}', // for image title

	input_id : null,
	provider_url : null,
	provider_id : null,

	return_url_id : null,
	return_url_name : null,
	return_url : null,

	/**
	 * Class constructor
	 * 
	 * @return {Void}
	 */
	init : function(input_id, return_url_id, return_url_name, return_url) {
		providers = $.extend({}, providers_large);
		var openid_btns = $('#openid_btns');
		this.input_id = input_id;
		this.return_url_id = return_url_id;
		this.return_url = return_url;
		this.return_url_name =  return_url_name;
		$('#openid_choice').show();
		$('#openid_input_area').empty();
		$('#openid_form').submit(this.submit);
		// var box_id = this.readCookie();
		// if (box_id) {
		// 	this.signin(box_id, true);
		// }
		this.signin('google', false)
	},

	/**
	 * Provider image click
	 * 
	 * @return {Void}
	 */
	signin : function(box_id, onload) {
		var provider = providers[box_id];
		if (!provider) {
			return;
		}
		this.setCookie(box_id);
		this.provider_id = box_id;
		this.provider_url = provider.url;
		// prompt user for input?
		if (provider.label) {
			this.useInputBox(provider);
		} else {
			$('#openid_input_area').empty();
			if (!onload) {
				$('#openid_form').submit();
			}
		}
	},

	/**
	 * Sign-in button click
	 * 
	 * @return {Boolean}
	 */
	submit : function() {
		openid.setReturnUrl();

		var url = openid.provider_url;
		if (url) {
			url = url.replace('{username}', $('#openid_username').val());
			openid.setOpenIdUrl(url);			
		}
		if (openid.demo) {
			alert(openid.demo_text + "\r\n" + document.getElementById(openid.input_id).value);
			return false;
		}
		if (url && url.indexOf("javascript:") == 0) {
			url = url.substr("javascript:".length);
			eval(url);
			return false;
		}
		return true;
	},

	/**
	 * @return {Void}
	 */
	setOpenIdUrl : function(url) {
		var hidden = document.getElementById(this.input_id);
		if (hidden != null) {
			hidden.value = url;
		} else {
			$('#openid_form').append('<input type="hidden" id="' + this.input_id + '" name="' + this.input_id + '" value="' + url + '"/>');
		}
	},

	setReturnUrl : function() {
		var hidden = document.getElementById(this.return_url_id);
		if (hidden != null) {
			hidden.value = this.return_url;
		} else {
			$('#openid_form').append('<input type="hidden" id="' + this.return_url_id + '" name="' + this.return_url_name + '" value="' + this.return_url + '"/>');
		}		
	},


	setCookie : function(value) {
		var date = new Date();
		date.setTime(date.getTime() + (this.cookie_expires * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
		document.cookie = this.cookie_name + "=" + value + expires + "; path=" + this.cookie_path;
	},

	readCookie : function() {
		var nameEQ = this.cookie_name + "=";
		var ca = document.cookie.split(';');
		for ( var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ')
				c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0)
				return c.substring(nameEQ.length, c.length);
		}
		return null;
	},

	setDemoMode : function(demoMode) {
		this.demo = demoMode;
	}
};
})(jQuery);
