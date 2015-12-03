/* dependencies on AuthManager and UtilManager */
var URLManager = (function(){
	
	/* function to generate google api feed */
	var generateAPIURL = function(webURL){
		var str = "https://www.googleapis.com/blogger/v3/blogs/byurl";
		var params = {};
		params.url = url.parse(webURL).hostname;
		params.key = AuthManager.getKey();
		var queryString = UtilManager.objToQS(params);
		str += queryString;
		return str;
	}

	/* function to generate blogger feed URL */
	var generateBlogFeedURL = function(blogID){
		var baseURL = "https://www.blogger.com/feeds/";
		baseURL = baseURL.concat(blogID);
		baseURL = baseURL.concat("/posts/default");
		var params = {
			"max-results" : settings.maxResults,
			"alt" : "json"
		};
		var queryString = UtilManager.objToQS(params);
		return baseURL.concat(queryString);
	}

	return {
		generateAPIURL : generateAPIURL,
		generateBlogFeedURL : generateBlogFeedURL
	}

})();