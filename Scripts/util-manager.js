var UtilManager = (function(){


	/* converts object to query string */
	var objectToQueryString = function(obj){
		var str = "?";
		for(key of Object.keys(obj)){
			str += key+ "="+ obj[key]+ "&";
		}
		return str.substring(0,str.length - 1);
	}


	return {
		objToQS : objectToQueryString
	}
	
})();