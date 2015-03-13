angular.module('totem.build')
.controller('build', [
		'$scope',
		'$state',
		'totems',
		function($scope, $state, totems) {
			$scope.buildTotem = function() {
				totems
					.build($scope.newTotem)
					.then(function(id) {
						$state.go('view', {id: id})
					});
			};
		}
	]);