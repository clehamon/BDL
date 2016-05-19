'use strict';

/**
 * @ngdoc function
 * @name bdl6App.controller:ResultsdetailsCtrl
 * @description
 * # ResultsdetailsCtrl
 * Controller of the bdl6App
 */
angular.module('bdl6App')
  .controller('ResultsdetailsCtrl', function ($scope,  $routeParams, Ref, $firebaseObject, $firebaseArray) {
    $scope.resultArray = $firebaseArray(Ref.child('Result/' + Ref.getAuth().uid + '/' +$routeParams.quizID+'/'+$routeParams.timestamp));
    var quiz = $firebaseObject(Ref.child('Quiz/' + Ref.getAuth().uid + '/' +$routeParams.quizID));

    quiz.$loaded().then(function(){
    	$scope.questions = $firebaseArray(Ref.child('Question/'+quiz.Questions));

	    $scope.questions.$loaded().then(function(){
	    	for (var i = $scope.questions.length - 1; i >= 0; i--) {
	    		$scope.questions[i].answers = $firebaseArray(Ref.child('Answer/'+quiz.Questions+'/'+$scope.questions[i].$id));
	    	}

	    	console.log($scope.questions);
	    	console.log($scope.resultArray);
	    });
    });

    

  });
