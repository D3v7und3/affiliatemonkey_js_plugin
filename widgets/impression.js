/*
*this module tracks impression once the library is loaded
*/
define(["jquery", "libs/endpoints"], function($, api){
	return function(){
		var current_url = window.location.href;

		var url_with_params = api.impression_url + "?url=" + current_url;

		// alert(url_with_params);

		$.ajax({
	    	type: 'GET',
	      	dataType: 'jsonp',
	      	url: url_with_params,
	    }).done(function(data){
	    	//nothing is done
	    	// alert(data);
	    });
	}
})