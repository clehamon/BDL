'use strict';

/**
 * @ngdoc function
 * @name bdl6App.controller:NewquizCtrl
 * @description
 * # NewquizCtrl
 * Controller of the bdl6App
 */
angular.module('bdl6App')
  .controller('NewquizCtrl', function ($scope, $firebaseObject, $firebaseArray, $routeParams, Ref, Auth) {
  	//$scope.quizID = $routeParams.quizID;
  	var quizID = $routeParams.quizID;
  	var questionArrayKey;
  	//Set-up quiz reference and binding
  	var quizRef = Ref.child('Quiz/' + Ref.getAuth().uid + '/' + quizID);
  	var quizObj = $firebaseObject(quizRef);
	quizObj.$bindTo($scope, 'quiz');
	
	//Get the Question array key
	quizObj.$loaded().then(function () {
  		questionArrayKey = quizObj.Questions;
	});

	//Question scope variables
	$scope.questionName;
	$scope.questionImg = "";
	$scope.questionTime;
	$scope.questionType = "multiple";


	//Add question to array
	$scope.addQuestion = function(){
		var ref = Ref.child('Question/' + questionArrayKey);
		var qArray = $firebaseArray(ref);
		qArray.$add({Image: $scope.questionImg, Name: $scope.questionName, Time: $scope.questionTime, Type: $scope.questionType});
	}


  	//console.log($scope.quiz.Name);
    //$scope.quizRef = Ref.child('Quiz')
  });
