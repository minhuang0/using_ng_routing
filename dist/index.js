var mainApp = angular.module('mainApp', ['ngRoute']);

mainApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: './pages/home.html',
			controller: 'homeController'
		})
		.when('/user', {
			templateUrl: './pages/user.html',
			controller: 'userController'
		})
		.when('/article', {
			templateUrl: './pages/article.html',
			controller: 'articleController'
		});
});

mainApp.controller('homeController', function($scope, $route) {
	$scope.message = 'home pages';
});

mainApp.controller('userController', function($scope, $route) {
	$scope.message = '用户管理';
});

mainApp.controller('articleController', function($scope, $route) {
	$scope.message = 'article pages';
});

mainApp.controller('headerController', function HeaderController($scope, $location) {
	$scope.isActive = function(viewLocation) {
		return viewLocation === $location.path();
	};
});

/*
 * NOTE: 
 * A very elegant way is to use ng-controller to run a single controller outside of the ng-view
 * http://stackoverflow.com/questions/16199418/how-do-i-implement-the-bootstrap-navbar-active-class-with-angular-js
 */

/*
 * TODO:
 * 登陆页面
 */

/*(function() {
	if (sessionStorage.getItem("key") === "") {
		window.location.replace("./pages/login.html");
	}
})();*/