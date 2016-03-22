/*
*this module tracks impression once the library is loaded
*/
define(["jquery", "endpoints"], function($, api){
	return function(){
		var current_url = window.location.href;

		var url_with_params = api.impression_url + "?url=" + current_url;
		console.log("in impression");

		// alert(url_with_params);

		$.ajax({
	    	type: 'GET',
	      	dataType: 'jsonp',
	      	url: url_with_params,
	    }).done(function(data){
					console.log("successfully logged impression");
	    	//nothing is done
	    	// alert(data);
	    });
	}
})
