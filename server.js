var express        = require('express');
var app            = express();
var bodyParser = require('body-parser');
var request = require('request');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var URLManager = require('url-manager');
var Settings = require('proj-settings');

/* static webpage */
app.use(express.static(__dirname)); 
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());    
app.use(methodOverride());

app.get('/getBlogURL', function(req,resp){
	var params = req.body;
	if(params.length > 0){

	}
});

app.get('/getDefaultBlogURL',function(req,resp){
	/* default blog mentioned in settings module */
	var blogID = Settings.defaultBlog.blogID;
	//console.log(URLManager);
	var reqURL =  URLManager.generateBlogFeedURL(blogID,1);
	request(reqURL,function(err,response,body){
		if(!err){
			/* convert response to object */
			var blogObj = {};
			if(typeof blogObj == "string"){ 
				blogObj = JSON.parse(body)
			} else {
				blogObj = body;
			}
			//console.log("Entries : " + blogObj.feed.entry.length);
			resp.send(blogObj); 
		}
	});
});

app.get('/getBlogByID',function(req,resp){
	/* get blogID from User */
	var blogID = req.query.blogID;
	//console.log(blogID);
	var reqURL =  URLManager.generateBlogFeedURL(blogID,1);
	request(reqURL,function(err,response,body){
		if(!err){
			/* convert response to object */
			var blogObj = {};
			if(typeof body == "string"){ 
				blogObj = JSON.parse(body)
			} else {
				blogObj = body;
			}

			blogObj = URLManager.processBlogPosts(blogObj);
			//console.log("Entries : " + blogObj.feed.entry.length);
			resp.send(blogObj); 
		}
	});
});


/*app.post('/saveData',function(req,resp){
	if(req.body != undefined){
		UserModel.save(function(err,datax){
			console.log("data saved");
		});
	}
})

app.get('/userData',function(req,resp){
	UserModel.find(function(err,data){
		if(!err){
			resp.json(data);
		}
	});
});*/



var PORT_ENV = 3333;
app.listen(PORT_ENV);
console.log("App listening on port"+ PORT_ENV);
