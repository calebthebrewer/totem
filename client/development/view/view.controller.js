angular.module('totem.view')
	.controller('view', [
		'$scope',
		'currentTotem',
		'currentLocation',
		'Totem',
		'Marker',
		function($scope, currentTotem, currentLocation, Totem, Marker) {
			var totem = Totem(currentTotem),
				marker;

			//setup current totem
			$scope.markers = totem.markers;
			//watch for updates from all markers
			$scope.$on('update-markers', function() {
				$scope.markers = totem.markers;
			});

			//add this client to the party
			totem
				.addMarker(currentLocation)
				.then(function(currentMarker) {
					marker = Marker(currentMarker);
					$scope.markers.push(marker);
					//watch for changes on this marker
					$scope.$on('update-marker', function() {
						totem.updateMarker(marker);
					});
				});
		}
	]);