angular.module('totem')
.controller('navigation', [
		'$scope',
		function($scope) {
			$scope.$on('$stateChangeSuccess', function(event, newState) {
				$scope.hidden = newState.name === 'home';
			});
		}
	]);