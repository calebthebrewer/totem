angular.module('totem.find')
.controller('find', [
		'$scope',
		'totems',
		function($scope, totems) {
			$scope.searchTotems = function searchTotems() {
				var query = $scope.totemName;

				totems
					.search(query)
					.then(function(totems) {
						$scope.foundTotems = totems;
					});
			};
		}
	]);