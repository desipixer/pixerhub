/* app initialization and routing configuration */
var app = angular.module('pixerApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider.when('/home', {
        controller: 'homeCtrl',
        templateUrl: 'Pages/home.html'
    }).when('/photos', {
        controller: 'photosCtrl',
        templateUrl: 'Pages/photos.html'
    }).when('/photos/:blogID', {
        controller: 'photosCtrl',
        templateUrl: 'Pages/photos.html'
    }).when('/photos/:blogID/:postID', {
        controller: 'postCtrl',
        templateUrl: 'Pages/post.html'
    }).otherwise({
        template: '<div> Not Found </div>'
    })
});