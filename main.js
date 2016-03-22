require.config(
		{
			baseurl: "http://affiliatemonkey.co/jsapp",
			paths : {
			    jquery : "libs/jquery"
			 }
		});

require(["text!style.css", "render_widget", "jquery", "impression"],
  function(css, renderWidget, jquery, impression){

  	//inject css into the page
  	var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

	style.type = 'text/css';
	if (style.styleSheet){
	  style.styleSheet.cssText = css;
	} else {
	  style.appendChild(document.createTextNode(css));
	}

	head.appendChild(style);


	$(".affmonkey-product-box-widget").each(function(index){

		renderWidget(this, "product-box");
	})


	$(".affmonkey-product-card-widget").each(function(index){
		renderWidget(this, "product-card");
	})

	$(".affmonkey-single-row-widget").each(function(index){
		renderWidget(this, "single-row");
	})

	$(".affmonkey-double-row-widget").each(function(index){
		renderWidget(this, "double-row");
	})

	//send impression
	impression();

});
