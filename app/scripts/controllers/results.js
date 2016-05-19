'use strict';

/**
 * @ngdoc function
 * @name bdl6App.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the bdl6App
 */
angular.module('bdl6App')
  .controller('ResultsCtrl', function ($scope, $routeParams, Ref, $firebaseArray, Auth) {

  	$scope.quizID = $routeParams.quizID;

    $scope.resultsList = $firebaseArray(Ref.child('Result/' + Ref.getAuth().uid + '/' +$routeParams.quizID));

    // For each result had the number of players as an attribute
    $scope.resultsList.$loaded().then(function(){
    	for (var i = $scope.resultsList.length - 1; i >= 0; i--) {

    		//minus 2 for the $$hashkey and $id attributes always present
    		$scope.resultsList[i].nbPlayers = Object.keys($scope.resultsList[i]).length-2;
    	}
    })
  });
