angular.module('aplication')
.config(function($routeProvider){
	$routeProvider
	.when('/', {
		controller: "HomeCtrl",
		templateUrl:'./templates/load.html' 
	})
	.when('/customize/',{
		templateUrl:'./templates/customize.html'
	})
	.when('/waiting/',{
		templateUrl:'./templates/waiting.html'
	})
	.when('/fail/',{
		templateUrl:'./templates/fail.html'
	})
	.otherwise({redirectTo:'/'});
})