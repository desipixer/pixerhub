/* 	@author : senthilmpro
	@organization : pixerhub
	@email : senthilmpro@gmail.com
*/

/* Module with common utilities used everywhere */

var CommonUtils = (function(){

	/* Converts Object to QueryString */
	var objToQueryString = function(obj){
		var str = "?";
		for(key of Object.keys(obj)){
			str += key+ "="+ obj[key]+ "&";
		}
		return str.substring(0,str.length - 1);
	}

	/* writes to JSON file with neatly formatted and spacing given filename and json object as inputs */
	var writeJSON = function(filename,json){
		require('fs').writeFile(filename, JSON.stringify(json,null,4),function(err){
			if(!err){
				console.log("Successfully written to : "+ filename);
			}
		})
	}

	/* writes into a text file given filename and string as inputs */
	var writeString = function(filename,str){
		require('fs').writeFile(filename,str,function(err){
			if(!err){
				console.log("Successfully written to : "+ filename);
			}
		});
	}

	/* folderutil to create Folder */
	var folderutil = (function(){
		var createFolder = function(name){
			if(!require('fs').existsSync(name)){
				require('fs').mkdirSync(name,0766,function(err){
					console.log(err);
				})
			}
		} 
		return {
			createFolder : createFolder
		}
	})();


	return {
		objToQueryString : objToQueryString,
		writeJSON : writeJSON,
		writeString : writeString,
		folderutil : folderutil
	}
})();