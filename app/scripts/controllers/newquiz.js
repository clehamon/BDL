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

  	$scope.quizID = $routeParams.quizID;
  	var aID;
  	var questionArrayKey;
  	var obj;
  	$scope.answerArray = [];
  	$scope.currentQuestion;
  	$scope.questionArray = [];

  	//Set-up quiz reference and binding
  	var quizRef = Ref.child('Quiz/' + Ref.getAuth().uid + '/' + $scope.quizID);
  	var quizObj = $firebaseObject(quizRef);
	quizObj.$bindTo($scope, 'quiz');
	
	//Get the Question array key
	quizObj.$loaded().then(function () {
  		questionArrayKey = quizObj.Questions;
  		refresh();
	});

	function newQuestion() {
		var ref = Ref.child('Question/' + questionArrayKey);
		aID = ref.push({Image: 'temp', Name: '', Time: 20, Type: 'multiple'});
		//var objRef = Ref.child('Question/' + questionArrayKey + '/' + aID.key());
		//obj = $firebaseObject(objRef);
		//obj.$bindTo($scope, 'quest');
		//$scope.questionArray.push(aID.key());
		//$scope.currentQuestion = $scope.questionArray.length;
		populate(aID.key());
	}

	function populate(id) {
		aID = Ref.child('Question/' + questionArrayKey + '/' + id);
		obj = $firebaseObject(aID);
		obj.$bindTo($scope, 'quest');
		loadAnswers();
	}

	function refresh() {
		var ref = Ref.child('Question/' + questionArrayKey);
		var temp = $firebaseArray(ref);
		temp.$loaded().then(function (){
			if (temp.length === 0){
				newQuestion();
				$scope.questionArray.push(aID.key());
				$scope.currentQuestion = $scope.questionArray.length;
				//location.reload();
			}
			else{
				for (var i = 0; i < temp.length ; i++)
					$scope.questionArray.push(temp[i].$id);
				populate(temp[0].$id);
				$scope.currentQuestion = 1;
			}
		});
	}

	$scope.changedQuestion = function(num){
		obj.$destroy();
		populate($scope.questionArray[num]);
		$scope.currentQuestion = num + 1;
	}

	function loadAnswers() {
		var b = Ref.child('Answer/' + questionArrayKey + '/' + aID.key());
		$scope.answerArray = $firebaseArray(b);
	}

	$scope.addAnswerToArray = function(a){
		var b = Ref.child('Answer/' + questionArrayKey + '/' + aID.key());
		b.push(a);
		$scope.answerArray = $firebaseArray(b);
	}

	//Add question to array
	$scope.addQuestion = function(){
		if ($scope.quest.Type === "multiple"){
			obj.$destroy();
			newQuestion();
			$scope.questionArray.push(aID.key());
			$scope.currentQuestion = $scope.questionArray.length;
		}
	}
  });
