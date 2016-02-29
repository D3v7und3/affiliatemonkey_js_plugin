define(["text!templates/product_box.html", "libs/mustache", "libs/endpoints", "jquery"], function(template, M, api, $){

	return function(element){

		
		var title = $(element).data("title");
		if(!title)
			return;

		title = encodeURIComponent(title);

		var exact_match = "no";

		var current_url = window.location.href;

		if($(element).data("exact-match"))
			exact_match = $(element).data("exact-match");

		if(exact_match != "yes" && exact_match != "no")
			exact_match = "no";

		if(exact_match == "yes"){
			exact_match = "&exact_match=yes";
		}else{
			exact_match = "";
		}
			

		var url_with_params = api.url + "?query=" + title + "&url=" + current_url + exact_match;

		

		$.ajax({
	    	type: 'GET',
	      	dataType: 'jsonp',
	      	url: url_with_params,
	    }).done(function(data){
	    	alert(JSON.stringify(data));
	    	if(data.status == "OK" && data.products.length > 0){
	    		//pass the returned data into the template and render here
	    		alert(JSON.stringify(data.products));
	    		var template_tags = data.products[0];

	    		var output = M.render(template, template_tags);

	    		$(element).replaceWith(output);

	    	}
	    })

		
		

		// alert(title);

	}
});