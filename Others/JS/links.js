/* file to generate links for sym tracker */

/*base url
queryString
authorization
typeof URL 
*/

var symURL = function(path,params,type){
	
	if(type == "JIRA"){
		var queryString = "";
		var location = "https://jira.ges.symantec.com/";
		//var path = "rest/greenhopper/1.0/xboard/work/allData.json";
		if(params != null){
			if(Object.keys(params).length != 0)
				var queryString = objToQuery(params);
		}
		return location.concat(path,queryString);
	}
}

// converts object to query string 
var objToQuery = function(obj){
	var qStr = "?";
	for(key of Object.keys(obj)){
		qStr = qStr.concat(key+"="+obj[key] + "&");
	}
	return qStr.substring(0,qStr.length - 1);
}


//adds auth and generates URL 

var AuthUtil = function(username,encryptedPass){
		
}

/* get all issues related to user */
var path = "rest/greenhopper/1.0/xboard/work/allData.json";
var params = {
	rapidViewId : 1413,
	activeQuickFilters : 14705
}

symURL(path,params,"JIRA");



/* Edit specific issue */
var path = "secure/AjaxIssueEditAction!default.jspa";
var params = {
	decorator : "none",
	issueId : 501721
}

symURL(path,params,"JIRA");



/* Edit specific issue */
var path = "rest/greenhopper/1.0/rapidviewconfig/editmodel.json";
var params = {
	rapidViewId : "1413"
}

symURL(path,params,"JIRA");

https://jira.ges.symantec.com/rest/greenhopper/1.0/rapidviewconfig/editmodel.json?rapidViewId=1413&_=1446058915895
