angular.module('totem.build')
	.config([
		'$stateProvider',
		function($stateProvider) {
			$stateProvider
				.state('build', {
					url: '/build',
					templateUrl: 'build/build.tpl.html',
					controller: 'build'
				});
		}]);