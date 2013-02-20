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
		this.input_id = input_id;
		this.return_url_id = return_url_id;
		this.return_url = return_url;
		this.return_url_name =  return_url_name;
		$('#openid_choice').show();
		$('#openid_input_area').empty();
		$('#openid_form').submit(this.submit);
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
};
})(jQuery);
