angular.module('totem')
.factory('Marker', [
		'$http',
		'$timeout',
		'markers',
		'$rootScope',
		function($http, $timeout, markers, $rootScope) {

			return function MarkerFactory (marker) {
				var oldMarker;

				$timeout(function updateLocation() {
					markers
						.getLocation()
						.then(function(location) {
							var newMarker = _.defaults(location, oldMarker);
							if (newMarker !== oldMarker) {
								marker = newMarker;
								$rootScope.$broadcast('update-marker');
							}
						});
				}, 500);

				return marker;
			};
		}
	]);