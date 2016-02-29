require.config(
		{
			baseurl: "/javascripts",
			paths : {
			    jquery : "libs/jquery"
			 }
		});

require(["widgets/product_box",
 "widgets/single_row", "jquery",
  "widgets/double_row", "widgets/impression"], function(renderProductBox, renderSingleRow, jquery, renderDoubleRow, impression){
	

	// registerImpression();
	// renderSingleRow();
	var els = $(".test_container");

	// renderDoubleRow(els);

	// renderSingleRow(els);

	// if(els){

	// }


	renderProductBox(els);
	
	impression();

});