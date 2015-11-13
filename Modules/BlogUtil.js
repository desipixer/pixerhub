/* 	@author : senthilmpro
	@organization : pixerhub
	@email : senthilmpro@gmail.com
*/
var BlogUtil = (function(){
	
	
	/* filters blog Images from HTML */
	var filterBlogImages = function(htmlContent){
		//copy paste from other website.
		var imgArr = [];
		var imgTags = htmlContent.match(/<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g);
		if(imgTags != undefined && imgTags.length > 0 ){
			for(var i=0 ; i < imgTags.length ; i++){
				var imgURL = imgTags[i].match(/(https?:\/\/.*\.(?:png|jpg))/ig);
				if(imgURL != undefined && imgURL.length > 0){
					var picURL = imgURL[0];
					if(picURL.indexOf('blogspot.com')){
					    var splitter = picURL.split("/")[7];
					    picURL = picURL.replace(splitter,"s1600");
					    imgArr.push(picURL);
					}
				}
			}
		}
		return imgArr;
	} 

	/* Authentication Manager for PixerHub */
	var AuthManager = (function(){
		var key = 'AIzaSyBZvR46qyUilZ6Fl5vn9oPnLZtYHnqSknE';
		var getKey = function(){
			return key;
		}
		return {
			getKey : getKey
		}
	})();

	/* Converts Object to QueryString */
	var objToQueryString = function(obj){
		var str = "?";
		for(key of Object.keys(obj)){
			str += key+ "="+ obj[key]+ "&";
		}
		return str.substring(0,str.length - 1);
	}

	/* function to generate blogFeedURL based on blogID */
	var generateBlogFeedURL = function(blogID){
		var baseURL = "https://www.blogger.com/feeds/";
		baseURL = baseURL.concat(blogID);
		baseURL = baseURL.concat("/posts/default");
		var params = {
			"max-results" : settings.maxResults,
			"alt" : "json"
		};
		var queryString = objToQueryString(params);
		return baseURL.concat(queryString);
	}

	/* function to generate google API url to get blogID */
	var generateAPIURL = function(blogName){
		var baseURL = "https://www.googleapis.com/blogger/v3/blogs/byurl";
		var params  = {
			"key" : AuthManager.getKey(),
			"url" : blogName
		}
		var queryString = objToQueryString(params);
		return baseURL.concat(queryString);
	}

	/* generates blog URL which contains token */
	var generateBlogURL = function(id,params){
		var baseURL = "https://www.googleapis.com/blogger/v3/blogs/";
		baseURL = baseURL.concat(id);
		baseURL = baseURL.concat("/posts");
		var reqParams = {
			"fetchImages":"true",
			"key" : AuthManager.getKey(),
			"maxResults" : settings.maxResults 
		};
		if(Object.keys(params).length == 0){
			params = reqParams;
		}
		if(Object.keys(params).length > 0){
			for (attrname of Object.keys(reqParams)) { params[attrname] = reqParams[attrname]; }
		}
		var qs = objToQueryString(params);
		var reqURL = baseURL.concat(qs);
		return reqURL;
	}

	/* removes stop words from the title */
	var removeStopWords = function(string){
		var stopWords = ["Telugu","Tamil","Actress","Acress","CelebsNext","Photoshoot","Cinema","Photos","Photo","Pictures","Picture","Tollywood","Kollywood","Movies","Movie","Latest","Saree","Gallery","Dress","Event","Audio","Stills","Still"," hot ","Navel","Cleavage","Boobs","Exposing","Desi ","Heroine","Heroin", "Images","Wallpapers","Wallpaper","Cute","Spicy","New ","Function","Success Meet","Teaser Launch","Launch "," Hot","Press Meet"," Launch","Sexy "];
		var rExp;
		for(word of stopWords){
			rExp = new RegExp(word,"gi");
			string = string.replace(rExp," ").trim();
		}
		string = removeNoise(string);
		string = string.replace(/\s/g," ").trim();
		return string;
	}

	function removeNoise(string){
		var noiseWords = ["%2B","%25"];
		var rExp;
		for(word of noiseWords){
			rExp = new RegExp(word,"gi");
			string = string.replace(rExp," ").trim();
			string = string.replace(/\W+/g," ").trim();
			string = string.replace(" jpg","").trim();
			string = string.replace(/\s/g," ").trim();
		}
		return string;
	}

	/* sorts feed object based on cleanTItle attribute */
	var compareTitle = function(a,b) {
	  if (a.cleanTitle < b.cleanTitle)
	    return -1;
	  if (a.cleanTitle > b.cleanTitle)
	    return 1;
	  return 0;
	}

	/* converts list of array elements to html elements */
	var getPostHTML = function(imageArray) {
	        var imageSrc = "";
	        imageArray.forEach(function(element,index){
	            imageSrc = imageSrc + "<a href='" + element + "'  target='_blank'><img src='" + element + "' /></a>";
	        });
	        return imageSrc;
	}

	/* adds new attributes to each entry of blog feed object */
	var processBlogEntry = function(entryObj){
		var obj = entryObj;
		obj.cleanTitle = removeStopWords(entryObj.title);
		obj.imageArray = filterBlogImages(entryObj.content);
		return obj;
	}


	var getShortName = function(name){
			var startIndex = name.indexOf(name.match(/\/\/(www.)*/g)) + name.match(/\/\/(www.)*/g)[0].length;
			var endIndex = name.indexOf(name.match(/(.blogspot)*(\.com|\.org|\.in)+/g));
			return name.substring(startIndex,endIndex);
	};

	var sortFeedArray = function(feedArray){
		return feedArray.sort(compareTitle);
	}

	return {
		filterBlogImages : filterBlogImages,
		generateAPIURL : generateAPIURL,
		generateBlogFeedURL : generateBlogFeedURL,
		generateBlogURL : generateBlogURL,
		objToQueryString : objToQueryString,
		removeStopWords : removeStopWords,
		compare : compareTitle,
		getPostHTML : getPostHTML,
		getShortName : getShortName,
		processBlogEntry : processBlogEntry,
		sortFeedArray : sortFeedArray
	}
})();


module.exports = BlogUtil;