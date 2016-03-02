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
			})
			.when('/user/edit/:id', {
				templateUrl: './pages/user/edit.html',
				controller: 'userEditController'
			})
			.when('/article/edit/:id', {
				templateUrl: './pages/article/edit.html',
				controller: 'articleController'
			})
			.when('/article/show/:id', {
				templateUrl: './pages/article/show.html',
				controller: 'articleController'
			})
			/*.otherwise({
				redirectTo: '/'
			})*/
		;
	})
	.controller('homeController', function($scope, $route) {
		$scope.message = 'home pages';
	})
	.controller('userController', function($scope, $route) {
		$scope.address = {
			provinces: globalFunction.address.getProvince(),
			cityes: '',
			hospitals: '',
			provinceSelect: '',
			citySelect: '',
			hospitalSelect: '',
			updateCity: function() {
				$scope.address.cityes = globalFunction.address.getCity($scope.address.provinceSelect);
				$scope.address.citySelect = '';
				$scope.address.updateHospital();
			},
			updateHospital: function() {
				$scope.address.hospitalSelect = '';
				$scope.address.hospitals = globalFunction.address.getHospital($scope.address.provinceSelect, $scope.address.citySelect);
			}
		};
		$scope.departments = globalVariable.options.optionsJson.department;
	})
	.controller('articleController', function($scope, $route, $routeParams) {
		$scope.articleStatus = globalVariable.options.optionsJson.articleStatus;
		$scope.departments = globalVariable.options.optionsJson.department;
		$scope.articleType = globalVariable.options.optionsJson.articleType;
		$scope.id = $routeParams.id;
		if ($routeParams.id == 0) {
			$scope.operation = "新建文章";
		} else {
			$scope.operation = "编辑文章";
		}
	})
	.controller('userEditController', function($scope, $routeParams) {;
		$scope.id = $routeParams.id;
	})
	.controller('menuController', function($scope, $location) {
		$scope.isActive = function(viewLocation) {
			return viewLocation === '/' + $location.path().split('/')[1];
		};
	});

/*
 * NOTE: 
 * A very elegant way is to use ng-controller to run a single controller outside of the ng-view
 * http://stackoverflow.com/questions/16199418/how-do-i-implement-the-bootstrap-navbar-active-class-with-angular-js
 */

/*
 * TODO:
 * 登陆判断
 */