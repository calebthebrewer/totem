angular.module('totem.view')
	.config([
		'$stateProvider',
		function($stateProvider) {
			$stateProvider
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