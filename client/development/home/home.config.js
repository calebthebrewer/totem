angular.module('totem.home')
	.config([
		'$stateProvider',
		function($stateProvider) {
			$stateProvider
				.state('home', {
					url: '/',
					templateUrl: 'home/home.tpl.html'
				});
		}]);