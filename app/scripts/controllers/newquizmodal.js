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

    $scope.newQuiz = function(title) {
    	var quizRef = Ref.child('Quiz');
    	var user = Ref.getAuth();
        var tagArray = [];
        var d = new Date();
        var date = d.getFullYear() + '/' + d.getMonth() + '/' + d.getDate();
        $scope.tags = [];
        for (var i = 0; i <= $scope.tags.length - 1; i++) {
            tagArray.push($scope.tags[i].text);
        };

        //Create question array
        var question = Ref.child('Question');
        var question_path = question.push("");
        var questionKey = question_path.key();

        var id = quizRef.child(user.uid).push({Name: title, TAG: tagArray, Date: date, Questions: questionKey});
        $location.path('newQuiz/' + id.key());


    	$uibModalInstance.close()
    	//TO-DO: update Teacher's Quiz Array with the created quiz ID
    }

    $scope.close = function() {
    	$uibModalInstance.close()
    }

  });
