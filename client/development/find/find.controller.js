angular.module('totem.find')
	.controller('find', [
		'$scope',
		'totems',
		function ($scope, totems) {
			var search = null;
			$scope.searchTotems = function searchTotems() {
				var query = $scope.totemName;

				totems
					.search(query)
					.then(function (totems) {
						$scope.foundTotems = totems;

						if (!totems.length) {
							$scope.searchMessage = 'Nothing found by that name.';
						} else {
							$scope.searchMessage = '';
						}
					});
			};
		}
	]);