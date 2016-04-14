'use strict';

/**
 * @ngdoc function
 * @name bdl6App.controller:NewquizmodalCtrl
 * @description
 * # NewquizmodalCtrl
 * Controller of the bdl6App
 */
angular.module('bdl6App')
  .controller('NewquizmodalCtrl', function ($scope, $firebaseObject, Auth, Ref, $location, $uibModalInstance) {

    $scope.newQuiz = function(title, tags) {
    	var quizRef = Ref.child('Quiz');
    	var user = Ref.getAuth();
    	var id = quizRef.child(user.uid).push({Name: title, TAG: tags});
    	$location.path('newQuiz/' + id.key());
    	$uibModalInstance.close()
    	//TO-DO: update Teacher's Quiz Array with the created quiz ID
    }

    $scope.close = function() {
    	$uibModalInstance.close()
    }

  });
