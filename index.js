(function(window, angular, undefined){
	'use strict';
	angular.module('TestApp', []);

	angular.module('TestApp').controller('testController', testController);
	function testController($scope, $http){
	    $scope.from_currency = {};
	    $scope.to_currency = {};
		$scope.amount = 1;
		$scope.all_currency = [];
		$scope.loaded = false;
       
       $scope.getCurrencyData = function() {
			$http.get("currencies.json")
			.then(function(response){ 
				$scope.all_currency = response.data;
				$scope.from_currency = $scope.all_currency[0];
				$scope.to_currency = $scope.all_currency[3];
				console.log($scope.all_currency);
			});
		}
		$scope.convert_in_currency =  function() {
			$scope.loaded = false;
		var params = {'amount':$scope.amount, 'from':$scope.from_currency.code, 'to':$scope.to_currency.code};
			console.log($scope.amount);
			$http.get("currency_api.php?amount=+"+$scope.amount+"&from="+$scope.from_currency.code+"&to="+$scope.to_currency.code+"")
			.then(function(response){
				console.log(response);
				$scope.loaded = true;
				$scope.results = response.data;

			});
		}
 	$scope.getCurrencyData();
    }
})(window, window.angular);