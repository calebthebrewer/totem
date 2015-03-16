angular.module('totem.view')
	.config([
		'$stateProvider',
		function($stateProvider) {
			$stateProvider
				.state('view-not-found', {
					url: '/view/not-found',
					templateUrl: 'view/not-found.tpl.html'
				})
				.state('view-no-location', {
					url: 'view/no-location',
					templateUrl: 'view/no-location.tpl.html'
				})
				.state('view', {
					url: '/view/:id?totem',
					templateUrl: 'view/view.tpl.html',
					controller: 'view',
					resolve: {
						currentTotem: [
							'$stateParams',
							'totems',
							function($stateParams, totems) {
								return totems.get($stateParams.id);
							}],
						currentLocation: [
							'markers',
							function(markers) {
								return markers.getLocation();
							}
						]
					}
				});
		}]);