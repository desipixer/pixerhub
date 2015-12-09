

/* controller function */
app.controller('myCtrl',function($scope,$http){
	$scope.submitBtn = function(){
		console.log($scope.event);
	};
	$scope.changeTab = function(tab) {
	    $scope.view_tab = tab;
	}
	$scope.menuItems = [
	{
		name : "Home",
		tab : "tab1",
		route : "home",
		class : {'active': "view_tab" == 'tab1'},
	},
	{
		name : "Photos",
		tab : "tab2",
		route : "photos",
		class : {'active': "view_tab" == 'tab2'},
	}]

	/*$http.get('/getDefaultBlogURL').success(function(data){
		$scope.blogFeedEntries = data;
	});*/

});

app.controller('homeCtrl',function($scope){
	$scope.pageTitle ="Home Page";
	
});

app.controller('photosCtrl',function($scope,$routeParams,$http,urlService){
	$scope.pageTitle = "Photos Page";
	$scope.blogFeedEntries = [];

	$scope.prop = {
		IsPhotosPage : false
	};


	if(Object.keys($routeParams) == 0){
		$scope.urlList = urlService.urlList;
	} else {
		$scope.urlList = null;
		$scope.blogID = $routeParams.blogID;
		$scope.prop.IsPhotosPage = true;
		$http.get('/getBlogByID?blogID='+$scope.blogID).success(function(data){
			$scope.blogFeedEntries = data;
		})
	}
	
})

app.controller('postCtrl', function($scope,$routeParams,$rootScope){
	$scope.pageTitle = "Post Page";

	debugger;
})
