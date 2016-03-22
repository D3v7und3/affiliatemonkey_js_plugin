define(["jquery"], function($){

	return function(){
			$("a.affmonkey-trackable-link").click(function(e){
		  //e.preventDefault();
				var api_endpoint = "http://affiliatemonkey.co/jsonp/tracking/click";
				console.log("in click tracking");

				var partner_id = $(this).data('partner-id');
				var source_app = $(this).data('source-app');
				var destination = $(this).data('destination');
				var source_url = window.location.href;

				var url_with_params = api_endpoint + "?partner_id="+partner_id
				  											+ "&source_app=" + source_app
				                        + "&destination_url=" + destination
				                        + "&source_url=" + source_url;
			    $.ajax({
			    	type: 'GET',
			      dataType: 'jsonp',
			      url: url_with_params,
			      error: function(){
			        // alert("error");
			      },
			      success: function(){
			        // alert("success");
							console.log("successfully logged click");
			      }
			    });

			    return true;

		  	});


	}
});
