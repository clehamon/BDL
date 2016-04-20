'use strict';

angular.module('bdl6App')
	.controller('StuHomeCtrl', function ($scope, student) {
		$scope.correctConnection = true;

		$scope.connectToQuiz = function(){
			$scope.correctConnection = student.setSession($scope.quizCode, $scope.playerName);
		};

		$scope.sendAnswer = function (key, answer) {
			console.log($scope.session.CurrentQuestion.Answers);
			console.log(key, answer);
			student.sendAnswer(key);
		}
	});

// angular.module('bdl6App')
//   .controller('ChatCtrl', function ($scope, Ref, $firebaseArray, $timeout) {
//   	$scope.testMessage = 'This is a test message in student homepage.'
//   });
