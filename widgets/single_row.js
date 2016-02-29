define(["text!templates/single_row.html", 
	"jquery", "libs/utilities", 
	"libs/endpoints", "libs/mustache"], function(template, $, utilities, api, M){

	
	return function(element){
		var current_url = window.location.href;

		//test data
		// current_url = "http://olorisupergal.com/mode-men-editor-in-chief-abubakar-tafawa-balewa-gets-engaged-on-valentines-day/";
		var terms = $(element).data("terms");

		//this will not allow the widget display anything when it is on home page
		if(utilities.is_home_page(current_url) && !terms)
			return ;

		
		if(terms){
			var url_with_params = api.url + "?query=" + encodeURIComponent(terms) + "&terms=yes&url=" + current_url + 
			"&total=4";

		}else{
			var url_with_params = api.url + "?url=" + current_url + "&total=4";
		}

		


		$.ajax({
	    	type: 'GET',
	      	dataType: 'jsonp',
	      	url: url_with_params,
	    }).done(function(data){
	    	if(data.status == "OK" && data.products.length > 0){
	    		//pass the returned data into the template and render here
	    		var template_tags = data;

	    		var output = M.render(template, template_tags);

	    		$(element).replaceWith(output);

	    	}
	    })


		// alert(url_with_params);
	}
});