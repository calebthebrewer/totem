angular.module('totem.find')
	.config([
		'$stateProvider',
		function($stateProvider) {
			$stateProvider
				.state('find', {
					url: '/find',
					templateUrl: 'find/find.tpl.html',
					controller: 'find'
				});
		}]);