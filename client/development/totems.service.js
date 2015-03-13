angular.module('totem')
	.service('totems', [
		'$http',
		'$q',
		function($http, $q) {

			this.build = function(totem) {
				var defer = $q.defer();

				$http
					.post('api/totems', totem)
					.success(function(totem) {
						defer.resolve(totem.id);
					});

				return defer.promise;
			};

			this.get = function(id) {
				var defer = $q.defer();

				$http
					.get('api/totems/' + id)
					.success(function(totem) {
						defer.resolve(totem);
					});

				return defer.promise;
			};
		}
	]);