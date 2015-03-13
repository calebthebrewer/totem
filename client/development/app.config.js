angular.module('totem')
	.config([
		'$urlRouterProvider',
		'uiGmapGoogleMapApiProvider',
		function($urlRouterProvider, uiGmapGoogleMapApiProvider) {

			$urlRouterProvider
				.otherwise('/');
		}]);