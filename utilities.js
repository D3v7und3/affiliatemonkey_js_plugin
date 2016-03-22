define([], function(){
	var utilities = {};

	utilities.is_home_page = function(url){
		var supplied_url = url || undefined;

		if(supplied_url == undefined)
			return true;

		var seperated_url = url.split("/");
		if(seperated_url.length > 1)
			return false

		return false;

	}

	return utilities;
})