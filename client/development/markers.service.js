angular.module('totem')
.service('markers', [
		'$q',
		function($q) {
			this.getLocation = function getLocation() {
				var defer = $q.defer();

				navigator.geolocation.getCurrentPosition(function(location) {
					defer.resolve(location.coords);
				}, function() {
					defer.reject();
				});

				return defer.promise;
			};
		}
	]);