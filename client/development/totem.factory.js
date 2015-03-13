angular.module('totem')
.factory('Totem', [
		'$q',
		'$http',
		'$rootScope',
		function($q, $http, $rootScope) {

			return function TotemFactory(totem) {
				//create socket, join room
				var socket = io();
				socket.emit('join', totem.id);

				socket.on('update-marker', function(marker) {
					updateWhere(totem.markers.models, {id: marker.id}, marker) || totem.markers.models.push(marker);
					$rootScope.$broadcast('update-markers');
				});

				return {
						addMarker: addMarker,
						updateMarker: updateMarker,
						markers: totem.markers.models
					};

				function addMarker(marker) {
					var defer = $q.defer();

					$http
						.post('api/totems/' + totem.id + '/marker', marker)
						.success(function(marker) {
							defer.resolve(marker);
						});

					return defer.promise;
				}

				function updateMarker(marker) {
					socket.emit('update-marker', marker);
					updateWhere(totem.markers.models, {id: marker.id}, marker);
					$rootScope.$broadcast('update-markers');
				}
			};

			function updateWhere(array, where, update) {
				var key = Object.keys(where)[0];
				for (var i = 0, l = array.length; i < l; i++) {
					if (array[i][key] === where[key]) {
						_.defaults(array[i], update);
						return true;
					}
				}
				return false;
			}
		}
	]);