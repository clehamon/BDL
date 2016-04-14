'use strict';

angular.module('bdl6App')
	.controller('StuHomeCtrl', function ($scope, student) {
		$scope.testMessage = 'This is a test message in students homepage.';

		$scope.connectToQuiz = function(){
			student.setSession($scope.quizCode, $scope.playerName);
		};
	});

// angular.module('bdl6App')
//   .controller('ChatCtrl', function ($scope, Ref, $firebaseArray, $timeout) {
//   	$scope.testMessage = 'This is a test message in student homepage.'
//   });
