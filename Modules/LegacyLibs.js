/* 	@author : senthilmpro
	@organization : pixerhub
	@email : senthilmpro@gmail.com
*/

/* modules for unused libraries and functions */
var LegacyLibs = (function() {
	var AuthManager  = {};

	var getAPIURL = function(id,nextPageToken,maxResults){
		var authKey = AuthManager.getKey(); 
		var apiURL = "https://www.googleapis.com/blogger/v3/blogs/"+ id +"/posts?fetchImages=true&key="+ authKey;
		if(id === undefined || id == ""){
			return;
		}
		if(nextPageToken !== undefined){
			// make default startIndex as 1
			apiURL += "&pageToken="+ nextPageToken;
		}
		if(maxResults !== undefined){
			// default value of maxResults : 500
			//maxResults = 500;
			apiURL += "&maxResults="+ maxResults;
		}
		return apiURL;
	}
	
	return  {
		getAPIURL : getAPIURL
	}
})();