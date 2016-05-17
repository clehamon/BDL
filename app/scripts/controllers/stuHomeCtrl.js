'use strict';

angular.module('bdl6App')
	.controller('StuHomeCtrl', function ($scope, student) {
		$scope.correctConnection = true;
		$scope.playerName = '';

		$scope.connectToQuiz = function(){
			console.log($scope.playerName);
			if ($scope.playerName === '') {
				$scope.noError = false;
				$scope.errorMessage = "Enter a name";
			} else {
				// $scope.noError = true;
				$scope.noError = student.setSession($scope.quizCode, $scope.playerName);
				if (!$scope.noError) {
					$scope.errorMessage = "No quiz correspond to this code";
				}
			}
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
