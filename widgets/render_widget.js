define(["text!templates/product_box.html", 
		"text!templates/product_card.html",
		"text!templates/single_row.html", 
		"text!templates/double_row.html", 
		"libs/endpoints", "libs/mustache", 
		"jquery", "libs/utilities", "widgets/click"],
			function(product_box, product_card, single_row, double_row, api, M, $, utilities, attachClickTracking){

				var controller = {};

				controller.itemBox = function(element){
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

					//responsible for styling the styleable properties
					var _style = {
						box_size: $(element).data("box-size") || "620px",
						border_color: $(element).data("border-color") || "#EAEAEA",
						border_size: $(element).data("border-size") || "1px",
						button_color: $(element).data("button-color") || "#FFA623",
						button_hover_color: $(element).data("button-hover-color") || "#FFA623",
						button_text_color: $(element).data("button-text-color") || "#FFA623",
						button_text_hover_color: $(element).data("button-text-hover-color") || "#FFFFFF"
					}
						

					var url_with_params = api.url + "?query=" + title + "&url=" + current_url + exact_match;

					var props = {};
					props["url"] = url_with_params;
					props["_style"] = _style;

					return props;
				
				}


				controller.itemsBox = function(element, total){
					var current_url = window.location.href;
					current_url = current_url.replace("#", "");


					//test data
					// current_url = "http://olorisupergal.com/mode-men-editor-in-chief-abubakar-tafawa-balewa-gets-engaged-on-valentines-day/";
					var terms = $(element).data("terms");

					//this will not allow the widget display anything when it is on home page
					if(utilities.is_home_page(current_url) && !terms)
						return ;

					
					if(terms){
						var url_with_params = api.url + "?query=" + encodeURIComponent(terms) + "&terms=yes&url=" + current_url + 
						"&total="+total;

					}else{
						var url_with_params = api.url + "?url=" + current_url + "&total="+total;
					}

					var props = {};

					props["url"] = url_with_params;

					return props;

				}


				return function(element, widget_name){

					var request_url = "";
					var template = "";
					var _style = "";

					var _props = null;

					switch(widget_name){
						case "product-box":
							template = product_box;
							_props = controller.itemBox(element);
							break;
						case "product-card":
							template = product_card;
							_props = controller.itemBox(element);

							break;
						case "single-row":
							template = single_row;
							_props = controller.itemsBox(element, 4);
							break;
						case "double-row":
							template = double_row;
							_props = controller.itemsBox(element, 8);
							break;
					}

					request_url = _props.url;
					if(_props["_style"])
						_style = _props._style;

					alert(request_url);

					$.ajax({
				    	type: 'GET',
				      	dataType: 'jsonp',
				      	url: request_url,
				    }).done(function(data){
				    	
				    	if(data.status == "OK" && data.products.length > 0){
				    		//pass the returned data into the template and render here
				    		var template_tags = data;

				    		if(_style)
				    			template_tags['style'] = _style;

				    		alert(JSON.stringify(data));

				    		var output = M.render(template, template_tags);

				    		$(element).replaceWith(output);

				    		//once the html widget has been injected into the dom then attach the click tracking
				    		attachClickTracking();

				    	}
				    });


				}

			}
		)