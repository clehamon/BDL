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
  	$scope.quizID = $routeParams.quizID;
  	var questionArrayKey;
  	$scope.answerArray = [];
  	//Set-up quiz reference and binding
  	var quizRef = Ref.child('Quiz/' + Ref.getAuth().uid + '/' + $scope.quizID);
  	var quizObj = $firebaseObject(quizRef);
	quizObj.$bindTo($scope, 'quiz');
	
	//Get the Question array key
	quizObj.$loaded().then(function () {
  		questionArrayKey = quizObj.Questions;
	});

	//Question scope variables
	$scope.questionName;
	$scope.questionImg = "";
	$scope.questionTime = 1;
	$scope.questionType = "multiple";

	$scope.changedQuestion = function(){

	}

	$scope.addAnswerToArray = function(answer){
		//var jsonString = angular.toJson(answer);
		//console.log(jsonString);
		//console.log(answer);
		$scope.answerArray.push(answer);
		console.log(JSON.parse(angular.toJson($scope.answerArray)));
	}
	//Add question to array
	$scope.addQuestion = function(){
		var ref = Ref.child('Question/' + questionArrayKey);
		var qid = ref.push({Image: $scope.questionImg, Name: $scope.questionName, Time: $scope.questionTime, Type: $scope.questionType});
		var aref = Ref.child('Answer/' + questionArrayKey + '/' + qid.key());
		aref.push(JSON.parse(angular.toJson($scope.answerArray)));
		//for (var i = 0; i < $scope.answerArray.length; i++)
		//	aref.push(JSON.parse(angular.toJson($scope.answerArray[i])));
		//var qArray = $firebaseArray(ref);
		//qArray.$add({Image: $scope.questionImg, Name: $scope.questionName, Time: $scope.questionTime, Type: $scope.questionType});
	}


  	//console.log($scope.quiz.Name);
    //$scope.quizRef = Ref.child('Quiz')
  });
